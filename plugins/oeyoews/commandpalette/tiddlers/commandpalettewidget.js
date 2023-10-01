/*\
title: $:/plugins/oeyoews/cmp/commandpalettewidget.js
type: application/javascript
module-type: widget

Command Palette Widget
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const getTiddlersWithTag = require('./lib/getTiddlersWithTag');
  const createElement = $tw.utils.domMaker;
  const getActiveElement = require('./lib/getActiveElement');
  const focusAtCaretPosition = require('./lib/focusAtCaretPosition');
  const getCurrentSelection = require('./lib/getCurrentSelection');

  class CommandPaletteWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.initialise(parseTreeNode, options);
      this.currentSelection = 0; //0 is nothing selected, 1 is first result,...
      this.symbolProviders = {};
      this.actions = [];
      this.triggers = [];
      this.prefixes = [];
      this.blockProviderChange = false;
      this.defaultSettings = {
        maxResults: 15,
        maxResultHintSize: 45,
        neverBasic: false,
        showHistoryOnOpen: true,
        escapeGoesBack: true,
        alwaysPassSelection: true,
        theme: '$:/plugins/oeyoews/commandpalette/Compact.css',
      };
      this.settings = {};
      this.commandHistoryPath =
        '$:/plugins/oeyoews/commandpalette/CommandPaletteHistory';
      this.settingsPath =
        '$:/plugins/oeyoews/commandpalette/CommandPaletteSettings';
      this.searchStepsPath =
        '$:/plugins/oeyoews/commandpalette/CommandPaletteSearchSteps';
      this.customCommandsTag = '$:/tags/CommandPaletteCommand';
      this.themesTag = '$:/tags/CommandPaletteTheme';
      this.typeField = 'command-palette-type';
      this.nameField = 'command-palette-name';
      this.hintField = 'command-palette-hint';
      this.modeField = 'command-palette-mode';
      this.userInputField = 'command-palette-user-input';
      this.caretField = 'command-palette-caret';
      this.immediateField = 'command-palette-immediate';
      this.triggerField = 'command-palette-trigger';
      this.prefixField = 'command-palette-prefix';
    }

    actionStringBuilder(text) {
      return (e) => this.invokeActionString(text, this, e);
    }

    actionStringInput(action, hint, e) {
      this.blockProviderChange = true;
      this.allowInputFieldSelection = true;
      this.searchHint.innerText = hint;
      this.searchContainer.value = '';
      this.currentProvider = () => {};
      this.currentResolver = (e) => {
        this.invokeActionString(action, this, e, {
          commandpaletteinput: this.searchContainer.value,
        });
        this.closePalette();
      };
      this.showResults([]);
      this.onInput(this.searchContainer.value);
    }

    invokeFieldMangler(tiddler, message, param, e) {
      let action = `<$fieldmangler tiddler="${tiddler}">
			<$action-sendmessage $message="${message}" $param="${param}"/>
			</$fieldmangler>`;
      this.invokeActionString(action, this, e);
    }

    //filter = (tiddler, terms) => [tiddlers]
    tagOperation(e, hintTiddler, hintTag, filter, allowNoSelection, message) {
      this.blockProviderChange = true;
      if (allowNoSelection) this.allowInputFieldSelection = true;
      this.currentProvider = this.historyProviderBuilder(hintTiddler);
      this.currentResolver = (e) => {
        if (this.currentSelection === 0) return;
        let tiddler =
          this.currentResults[this.currentSelection - 1].result.name;
        this.currentProvider = (terms) => {
          this.currentSelection = 0;
          this.searchHint.innerText = hintTag;
          let searches = filter(tiddler, terms);
          searches = searches.map((s) => {
            return { name: s };
          });
          this.showResults(searches);
        };
        this.searchContainer.value = '';
        this.onInput(this.searchContainer.value);
        this.currentResolver = (e) => {
          if (!allowNoSelection && this.currentSelection === 0) return;
          let tag = this.searchContainer.value;
          if (this.currentSelection !== 0) {
            tag = this.currentResults[this.currentSelection - 1].result.name;
          }
          this.invokeFieldMangler(tiddler, message, tag, e);
          if (!e.getModifierState('Shift')) {
            this.closePalette();
          } else {
            this.onInput(this.searchContainer.value);
          }
        };
      };
      this.searchContainer.value = '';
      this.onInput(this.searchContainer.value);
    }

    refreshThemes(e) {
      this.themes = getTiddlersWithTag(this.themesTag);
      let found = false;
      for (let theme of this.themes) {
        let themeName = theme.fields.title;
        if (themeName === this.settings.theme) {
          found = true;
          this.addTagIfNecessary(themeName, '$:/tags/Stylesheet', e);
        } else {
          this.invokeFieldMangler(
            themeName,
            'tm-remove-tag',
            '$:/tags/Stylesheet',
            e,
          );
        }
      }
      if (found) return;
      this.addTagIfNecessary(
        this.defaultSettings.theme,
        '$:/tags/Stylesheet',
        e,
      );
    }

    //Re-adding an existing tag changes modification date
    addTagIfNecessary(tiddler, tag, e) {
      if (this.hasTag(tiddler, tag)) return;
      this.invokeFieldMangler(tiddler, 'tm-add-tag', tag, e);
    }

    hasTag(tiddler, tag) {
      return $tw.wiki.getTiddler(tiddler).fields.tags.includes(tag);
    }

    refreshCommands() {
      this.actions = [];
      this.actions.push({
        name: 'Refresh Command Palette',
        action: (e) => {
          this.refreshCommandPalette();
          this.promptCommand('');
        },
        keepPalette: true,
      });
      this.actions.push({
        name: 'Explorer',
        action: (e) => this.explorer(e),
        keepPalette: true,
      });
      this.actions.push({
        name: 'See History',
        action: (e) => this.showHistory(e),
        keepPalette: true,
      });
      this.actions.push({
        name: 'New Command Wizard',
        action: (e) => this.newCommandWizard(e),
        keepPalette: true,
      });
      this.actions.push({
        name: 'Add tag to tiddler',
        action: (e) =>
          this.tagOperation(
            e,
            'Pick tiddler to tag',
            'Pick tag to add (⇧⏎ to add multiple)',
            (tiddler, terms) =>
              $tw.wiki.filterTiddlers(
                `[!is[system]tags[]] [is[system]tags[]] -[[${tiddler}]tags[]] +[search[${terms}]]`,
              ),
            true,
            'tm-add-tag',
          ),
        keepPalette: true,
      });
      this.actions.push({
        name: 'Remove tag',
        action: (e) =>
          this.tagOperation(
            e,
            'Pick tiddler to untag',
            'Pick tag to remove (⇧⏎ to remove multiple)',
            (tiddler, terms) =>
              $tw.wiki.filterTiddlers(
                `[[${tiddler}]tags[]] +[search[${terms}]]`,
              ),
            false,
            'tm-remove-tag',
          ),
        keepPalette: true,
      });

      let commandTiddlers = getTiddlersWithTag(this.customCommandsTag);
      for (let tiddler of commandTiddlers) {
        if (!tiddler.fields[this.typeField] === undefined) continue;
        let type = tiddler.fields[this.typeField];
        let text = tiddler.fields.text;
        if (text === undefined) text = '';
        let textFirstLine = text.match(/^.*/)[0];
        let hint = tiddler.fields[this.hintField];
        if (hint === undefined) hint = tiddler.fields[this.nameField];
        if (hint === undefined) hint = '';
        if (type === 'shortcut') {
          let trigger = tiddler.fields[this.triggerField];
          if (trigger === undefined) continue;
          this.triggers.push({ trigger, text, hint });
          continue;
        }
        if (!tiddler.fields[this.nameField] === undefined) continue;
        let name = tiddler.fields[this.nameField];
        if (type === 'prompt') {
          let immediate = !!tiddler.fields[this.immediateField];
          let caret = tiddler.fields[this.caretField];
          let action = {
            name: name,
            action: () => this.promptCommand(textFirstLine, caret),
            keepPalette: !immediate,
            immediate: immediate,
          };
          this.actions.push(action);
          continue;
        }
        if (type === 'prompt-basic') {
          let caret = tiddler.fields[this.caretField];
          let action = {
            name: name,
            action: () => this.promptCommandBasic(textFirstLine, caret, hint),
            keepPalette: true,
          };
          let prefix = tiddler.fields[this.prefixField];
          if (prefix !== undefined) {
            this.symbolProviders[prefix] = {
              provider: this.prefixedBasicProviderBuilder(
                textFirstLine,
                caret,
                hint,
              ),
              //resolver is set in provider after parsing the input without the prefix
              resolver: undefined,
            };
            this.prefixes.push({ prefix, hint });
          }
          this.actions.push(action);
          continue;
        }
        if (type === 'message') {
          this.actions.push({
            name: name,
            action: (e) => this.tmMessageBuilder(textFirstLine)(e),
          });
          continue;
        }
        if (type === 'actionString') {
          let userInput =
            tiddler.fields[this.userInputField] !== undefined &&
            tiddler.fields[this.userInputField] === 'true';
          if (userInput) {
            this.actions.push({
              name: name,
              action: (e) => this.actionStringInput(text, hint, e),
              keepPalette: true,
            });
          } else {
            this.actions.push({
              name: name,
              action: (e) => this.actionStringBuilder(text)(e),
            });
          }
          continue;
        }
        if (type === 'history') {
          let mode = tiddler.fields[this.modeField];
          this.actions.push({
            name: name,
            action: (e) =>
              this.commandWithHistoryPicker(textFirstLine, hint, mode).handler(
                e,
              ),
            keepPalette: true,
          });
          continue;
        }
      }
    }

    newCommandWizard() {
      this.blockProviderChange = true;
      this.searchContainer.value = '';
      this.searchHint.innerText = 'Command Name';
      let name = '';
      let type = '';
      let hint = '';

      let messageStep = () => {
        this.searchContainer.value = '';
        this.searchHint.innerText = 'Enter Message';
        this.currentResolver = (e) => {
          this.tmMessageBuilder('tm-new-tiddler', {
            title: '$:/' + name,
            tags: this.customCommandsTag,
            [this.typeField]: type,
            [this.nameField]: name,
            [this.hintField]: hint,
            text: this.searchContainer.value,
          })(e);
          this.closePalette();
        };
      };

      let hintStep = () => {
        this.searchContainer.value = '';
        this.searchHint.innerText = 'Enter hint';
        this.currentResolver = (e) => {
          hint = this.searchContainer.value;
          messageStep();
        };
      };

      let typeStep = () => {
        this.searchContainer.value = '';
        this.searchHint.innerText =
          'Enter type (prompt, prompt-basic, message, actionString, history)';
        this.currentResolver = (e) => {
          type = this.searchContainer.value;
          if (type === 'history') {
            hintStep();
          } else {
            this.tmMessageBuilder('tm-new-tiddler', {
              title: '$:/' + name,
              tags: this.customCommandsTag,
              [this.typeField]: type,
              [this.nameField]: name,
            })(e);
            this.closePalette();
          }
        };
      };

      this.currentProvider = (terms) => {};
      this.currentResolver = (e) => {
        if (this.searchContainer.value.length === 0) return;
        name = this.searchContainer.value;
        typeStep();
      };
      this.showResults([]);
    }

    explorer(e) {
      this.blockProviderChange = true;
      this.searchContainer.value = '$:/';
      this.lastExplorerInput = '$:/';
      this.searchHint.innerText = 'Explorer';
      this.currentProvider = (terms) => this.explorerProvider('$:/', terms);
      this.currentResolver = (e) => {
        if (this.currentSelection === 0) return;
        this.currentResults[this.currentSelection - 1].result.action(e);
      };
      this.onInput();
    }

    explorerProvider(url, terms) {
      let switchFolder = (url) => {
        this.searchContainer.value = url;
        this.lastExplorerInput = this.searchContainer.value;
        this.currentProvider = (terms) => this.explorerProvider(url, terms);
        this.onInput();
      };
      if (!this.searchContainer.value.startsWith(url)) {
        this.searchContainer.value = this.lastExplorerInput;
      }
      this.lastExplorerInput = this.searchContainer.value;
      this.currentSelection = 0;
      let search = this.searchContainer.value.substr(url.length);
      let tiddlers = $tw.wiki.filterTiddlers(
        `[removeprefix[${url}]splitbefore[/]sort[]search[${search}]]`,
      );
      let folders = [];
      let files = [];
      for (let tiddler of tiddlers) {
        if (tiddler.endsWith('/')) {
          folders.push({
            name: tiddler,
            action: (e) => switchFolder(`${url}${tiddler}`),
          });
        } else {
          files.push({
            name: tiddler,
            action: (e) => {
              this.navigateTo(`${url}${tiddler}`);
              if (!e.getModifierState('Shift')) {
                this.closePalette();
              }
            },
          });
        }
      }
      let topResult;
      if (url !== '$:/') {
        let splits = url.split('/');
        splits.splice(splits.length - 2);
        let parent = splits.join('/') + '/';
        topResult = { name: '..', action: (e) => switchFolder(parent) };
        this.showResults([topResult, ...folders, ...files]);
        return;
      }
      this.showResults([...folders, ...files]);
    }

    setSetting(name, value) {
      //doing the validation here too (it's also done in refreshSettings, so you can load you own settings with a json file)
      if (typeof value === 'string') {
        if (value === 'true') value = true;
        if (value === 'false') value = false;
      }
      this.settings[name] = value;
      $tw.wiki.setTiddlerData(this.settingsPath, this.settings);
    }

    //loadSettings?
    refreshSettings() {
      //get user or default settings
      this.settings = $tw.wiki.getTiddlerData(this.settingsPath, {
        ...this.defaultSettings,
      });
      //Adding eventual missing properties to current user settings
      for (let prop in this.defaultSettings) {
        if (!this.defaultSettings.hasOwnProperty(prop)) continue;
        if (this.settings[prop] === undefined) {
          this.settings[prop] = this.defaultSettings[prop];
        }
      }
      //cast all booleans
      for (let prop in this.settings) {
        if (!this.settings.hasOwnProperty(prop)) continue;
        if (typeof this.settings[prop] !== 'string') continue;
        if (this.settings[prop].toLowerCase() === 'true')
          this.settings[prop] = true;
        if (this.settings[prop].toLowerCase() === 'false')
          this.settings[prop] = false;
      }
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.execute();
      this.history = $tw.wiki.getTiddlerData(this.commandHistoryPath, {
        history: [],
      }).history;

      $tw.rootWidget.addEventListener('open-command-palette', (e) =>
        this.openPalette(e),
      );
      $tw.rootWidget.addEventListener('open-command-palette-selection', (e) =>
        this.openPaletteSelection(e),
      );
      $tw.rootWidget.addEventListener('insert-command-palette-result', (e) =>
        this.insertSelectedResult(e),
      );

      let inputAndMainHintWrapper = createElement('div', {
        class: 'flex justify-center items-center p-2',
      });
      // pointer-events-none fix z-index bug
      // backdrop-blur not effect with bg-neutral-600
      this.mask = createElement('div', {
        class:
          'opacity-0 backdrop-blur-lg z-[9998] fixed inset-0 bg-black/20 transition-all pointer-events-none cursor-pointer',
      });
      this.container = createElement('div', {
        class:
          'hidden bg-white flex-col z-[9999] transform shadow-lg p-2 mt-4 fixed left-1/2 -translate-x-1/2 w-1/2 rounded transition-all dark:invert w-3/4 md:w-1/2',
      });
      // if add type: "text", google-chrome always tip
      this.searchContainer = createElement('input', {
        type: '',
        class: 'w-full shadow-none border-none bg-transparent',
        attributes: {
          placeholder: '🔥 Search ...',
        },
      });
      this.searchHint = createElement('div', {
        class: 'commandpalettehint commandpalettehintmain',
      });
      inputAndMainHintWrapper.append(this.searchHint, this.searchContainer);
      this.scrollDiv = createElement('div', {
        class: 'cp-scroll',
      });
      this.container.append(inputAndMainHintWrapper, this.scrollDiv);
      this.searchContainer.addEventListener('keydown', (e) =>
        this.onKeyDown(e),
      );
      this.searchContainer.addEventListener('input', () =>
        this.onInput(this.searchContainer.value),
      );
      window.addEventListener('click', (e) => this.onClick(e));

      parent.insertBefore(this.mask, nextSibling);
      parent.insertBefore(this.container, nextSibling);

      this.refreshCommandPalette();

      this.symbolProviders['>'] = {
        provider: (terms) => this.actionProvider(terms),
        resolver: (e) => this.actionResolver(e),
      };
      this.symbolProviders['#'] = {
        provider: (terms) => this.tagListProvider(terms),
        resolver: (e) => this.tagListResolver(e),
      };
      this.symbolProviders['@'] = {
        provider: (terms) => this.tagProvider(terms),
        resolver: (e) => this.defaultResolver(e),
      };
      this.symbolProviders['?'] = {
        provider: (terms) => this.helpProvider(terms),
        resolver: (e) => this.helpResolver(e),
      };
      this.symbolProviders['['] = {
        provider: (terms, hint) => this.filterProvider(terms, hint),
        resolver: (e) => this.filterResolver(e),
      };
      this.symbolProviders['+'] = {
        provider: (terms) => this.createTiddlerProvider(terms),
        resolver: (e) => this.createTiddlerResolver(),
      };
      this.symbolProviders['|'] = {
        provider: (terms) => this.settingsProvider(terms),
        resolver: (e) => this.settingsResolver(),
      };
      this.currentResults = [];
      this.currentProvider = {};
    }

    refreshSearchSteps() {
      this.searchSteps = [];
      let steps = $tw.wiki.getTiddlerData(this.searchStepsPath);
      steps = steps.steps;
      for (let step of steps) {
        this.searchSteps.push(
          this.searchStepBuilder(step.filter, step.caret, step.hint),
        );
      }
    }

    refreshCommandPalette() {
      this.refreshSettings();
      this.refreshThemes();
      this.refreshCommands();
      this.refreshSearchSteps();
    }

    updateCommandHistory(command) {
      this.history = Array.from(new Set([command.name, ...this.history]));
      $tw.wiki.setTiddlerData(this.commandHistoryPath, {
        history: this.history,
      });
    }

    historyProviderBuilder(hint, mode) {
      return (terms) => {
        this.currentSelection = 0;
        this.searchHint.innerText = hint;
        let results;
        if (mode !== undefined && mode === 'drafts') {
          results = $tw.wiki.filterTiddlers('[has:field[draft.of]]');
        } else if (mode !== undefined && mode === 'story') {
          results = $tw.wiki.filterTiddlers('[list[$:/StoryList]]');
        } else {
          results = this.getHistory();
        }
        results = results.map((r) => {
          return { name: r };
        });
        this.showResults(results);
      };
    }

    commandWithHistoryPicker(message, hint, mode) {
      let handler = (e) => {
        this.blockProviderChange = true;
        this.allowInputFieldSelection = true;
        this.currentProvider = provider;
        this.currentResolver = resolver;
        this.searchContainer.value = '';
        this.onInput(this.searchContainer.value);
      };
      let provider = this.historyProviderBuilder(hint, mode);
      let resolver = (e) => {
        if (this.currentSelection === 0) return;
        let title = this.currentResults[this.currentSelection - 1].result.name;
        this.parentWidget.dispatchEvent({
          type: message,
          param: title,
          tiddlerTitle: title,
        });
        this.closePalette();
      };
      return {
        handler,
        provider,
        resolver,
      };
    }
    onInput(text) {
      if (this.blockProviderChange) {
        //prevent provider changes
        this.currentProvider(text);
        this.setSelectionToFirst();
        return;
      }
      let { resolver, provider, terms } = this.parseCommand(text);
      this.currentResolver = resolver;
      this.currentProvider = provider;
      this.currentProvider(terms);
      this.setSelectionToFirst();
    }
    parseCommand(text) {
      let terms = '';
      let resolver;
      let provider;
      let shortcut = this.triggers.find((t) => text.startsWith(t.trigger));
      if (shortcut !== undefined) {
        resolver = (e) => {
          let inputWithoutShortcut = this.searchContainer.value.substr(
            shortcut.trigger.length,
          );
          this.invokeActionString(shortcut.text, this, e, {
            commandpaletteinput: inputWithoutShortcut,
          });
          this.closePalette();
        };
        provider = (terms) => {
          this.searchHint.innerText = shortcut.hint;
          this.showResults([]);
        };
      } else {
        let providerSymbol = undefined;
        for (let prefix in this.symbolProviders) {
          if (
            text.startsWith(prefix) &&
            (providerSymbol === undefined ||
              providerSymbol.length < prefix.length)
          ) {
            providerSymbol = prefix;
          }
        }
        if (providerSymbol === undefined) {
          resolver = this.defaultResolver;
          provider = this.defaultProvider;
          terms = text;
        } else {
          provider = this.symbolProviders[providerSymbol].provider;
          resolver = this.symbolProviders[providerSymbol].resolver;
          terms = text.substring(providerSymbol.length);
        }
      }
      return { resolver, provider, terms };
    }
    onClick(e) {
      if (this.isOpened && !this.container.contains(e.target)) {
        this.closePalette();
      }
    }
    openPaletteSelection(e) {
      let selection = getCurrentSelection();
      e.param = selection;
      this.openPalette(e);
    }
    openPalette(e) {
      this.isOpened = true;
      this.allowInputFieldSelection = false;
      this.goBack = undefined;
      this.blockProviderChange = false;
      let activeElement = getActiveElement();
      this.previouslyFocused = {
        element: activeElement,
        start: activeElement.selectionStart,
        end: activeElement.selectionEnd,
        caretPos: activeElement.selectionEnd,
      };
      this.searchContainer.value = '';
      if (e.param !== undefined) {
        this.searchContainer.value = e.param;
      }
      if (this.settings.alwaysPassSelection) {
        this.searchContainer.value += getCurrentSelection();
      }
      this.currentSelection = 0;
      this.onInput(this.searchContainer.value); //Trigger results on open
      /** dynamic start*/
      this.container.classList.add('flex');
      this.container.classList.remove('hidden');
      this.mask.classList.remove('pointer-events-none');
      this.mask.classList.add('opacity-100');
      /** dynamic end */
      this.mask.addEventListener('scroll', (e) => e.stopPropagation());
      // 打开命令面板时, 禁用滚动
      document.body.style.overflow = 'hidden';
      // this.container.classList.add('translate-y-40')
      this.searchContainer.focus();
    }

    insertSelectedResult() {
      if (!this.isOpened) return;
      if (this.currentSelection === 0) return; //TODO: what to do here?
      let previous = this.previouslyFocused;
      let previousValue = previous.element.value;
      if (previousValue === undefined) return;
      let selection =
        this.currentResults[this.currentSelection - 1].result.name;
      if (previous.start !== previous.end) {
        this.previouslyFocused.element.value =
          previousValue.substring(0, previous.start) +
          selection +
          previousValue.substring(previous.end);
      } else {
        this.previouslyFocused.element.value =
          previousValue.substring(0, previous.start) +
          selection +
          previousValue.substring(previous.start);
      }
      this.previouslyFocused.caretPos = previous.start + selection.length;
      this.closePalette();
    }

    closePalette() {
      this.mask.classList.remove('opacity-100');
      this.mask.classList.add('pointer-events-none');
      this.container.classList.remove('flex');
      this.container.classList.add('hidden');

      this.isOpened = false;
      focusAtCaretPosition(
        this.previouslyFocused.element,
        this.previouslyFocused.caretPos,
      );

      // 打开命令面板时, 启用滚动
      document.body.style.overflow = 'auto';
    }
    onKeyDown(e) {
      if (e.key === 'Escape') {
        //									\/ There's no previous state
        if (!this.settings.escapeGoesBack || this.goBack === undefined) {
          this.closePalette();
        } else {
          this.goBack();
          this.goBack = undefined;
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        let sel = this.currentSelection - 1;

        if (sel === 0) {
          if (!this.allowInputFieldSelection) {
            sel = this.currentResults.length;
          }
        } else if (sel < 0) {
          sel = this.currentResults.length;
        }
        this.setSelection(sel);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        let sel =
          (this.currentSelection + 1) % (this.currentResults.length + 1);
        if (
          !this.allowInputFieldSelection &&
          sel === 0 &&
          this.currentResults.length !== 0
        ) {
          sel = 1;
        }
        this.setSelection(sel);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        this.validateSelection(e);
      }
    }
    addResult(result, id) {
      let resultDiv = createElement('div', {
        class: 'commandpaletteresult py-2 rounded',
        text: result.name,
      });
      if (result.hint !== undefined) {
        let hint = createElement('div', {
          class: 'commandpalettehint text-neutral-600',
          text: result.hint,
        });
        resultDiv.append(hint);
      }
      resultDiv.result = result;
      this.currentResults.push(resultDiv);
      resultDiv.addEventListener('click', (e) => {
        this.setSelection(id + 1);
        this.validateSelection(e);
      });
      this.scrollDiv.append(resultDiv);
    }
    validateSelection(e) {
      this.currentResolver(e);
    }
    defaultResolver(e) {
      if (e.getModifierState('Shift')) {
        this.searchContainer.value = '+' + this.searchContainer.value; //this resolver expects that the input starts with +
        this.createTiddlerResolver(e);
        return;
      }
      if (this.currentSelection === 0) return;
      let selectionTitle =
        this.currentResults[this.currentSelection - 1].result.name;
      this.closePalette();
      this.navigateTo(selectionTitle);
    }
    navigateTo(title) {
      this.parentWidget.dispatchEvent({
        type: 'tm-navigate',
        param: title,
        navigateTo: title,
      });
    }

    showHistory() {
      this.searchHint.innerText = 'History';
      this.currentProvider = (terms) => {
        let results;
        if (terms.length === 0) {
          results = this.getHistory();
        } else {
          results = this.getHistory().filter((h) => h.includes(terms));
        }
        results = results.map((r) => {
          return {
            name: r,
            action: () => {
              this.navigateTo(r);
              this.closePalette();
            },
          };
        });
        this.showResults(results);
      };
      this.currentResolver = (e) => {
        if (this.currentSelection === 0) return;
        this.currentResults[this.currentSelection - 1].result.action(e);
      };
      this.searchContainer.value = '';
      this.blockProviderChange = true;
      this.onInput(this.searchContainer.value);
    }

    setSelectionToFirst() {
      let sel = 1;
      if (this.allowInputFieldSelection || this.currentResults.length === 0) {
        sel = 0;
      }
      this.setSelection(sel);
    }

    setSelection(id) {
      this.currentSelection = id;
      for (let i = 0; i < this.currentResults.length; i++) {
        let selected = this.currentSelection === i + 1;
        this.currentResults[i].className = selected
          ? 'commandpaletteresult commandpaletteresultselected py-2 bg-neutral-200 text-neutral-900 rounded-sm'
          : 'commandpaletteresult py-2 dark:invert';
      }
      if (this.currentSelection === 0) {
        this.scrollDiv.scrollTop = 0;
        return;
      }
      let scrollHeight = this.scrollDiv.offsetHeight;
      let scrollPos = this.scrollDiv.scrollTop;
      let selectionPos =
        this.currentResults[this.currentSelection - 1].offsetTop;
      let selectionHeight =
        this.currentResults[this.currentSelection - 1].offsetHeight;

      if (
        selectionPos < scrollPos ||
        selectionPos >= scrollPos + scrollHeight
      ) {
        //select the closest scrolling position showing the selection
        let a = selectionPos;
        let b = selectionPos - scrollHeight + selectionHeight;
        a = Math.abs(a - scrollPos);
        b = Math.abs(b - scrollPos);
        if (a < b) {
          this.scrollDiv.scrollTop = selectionPos;
        } else {
          this.scrollDiv.scrollTop =
            selectionPos - scrollHeight + selectionHeight;
        }
      }
    }

    getHistory() {
      let history = $tw.wiki.getTiddlerData('$:/HistoryList');
      if (history === undefined) {
        history = [];
      }
      history = [
        ...history.reverse().map((x) => x.title),
        ...$tw.wiki.filterTiddlers('[list[$:/StoryList]]'),
      ];
      return Array.from(
        new Set(history.filter((t) => this.tiddlerOrShadowExists(t))),
      );
    }

    tiddlerOrShadowExists(title) {
      return $tw.wiki.tiddlerExists(title) || $tw.wiki.isShadowTiddler(title);
    }

    defaultProvider(terms) {
      this.searchHint.innerText = '🔍';
      this.searchHint.className = 'mr-2';
      let searches;
      if (terms.startsWith('\\')) terms = terms.substr(1);
      if (terms.length === 0) {
        if (this.settings.showHistoryOnOpen) {
          searches = this.getHistory().map((s) => {
            return { name: s, hint: 'history' };
          });
        } else {
          searches = [];
        }
      } else {
        searches = this.searchSteps.reduce((a, c) => [...a, ...c(terms)], []);
        searches = Array.from(new Set(searches));
      }
      this.showResults(searches);
    }

    searchStepBuilder(filter, caret, hint) {
      return (terms) => {
        let search = filter.substr(0, caret) + terms + filter.substr(caret);
        let results = $tw.wiki.filterTiddlers(search).map((s) => {
          return { name: s, hint: hint };
        });
        return results;
      };
    }

    tagListProvider(terms) {
      this.currentSelection = 0;
      this.searchHint.innerText = 'Search tags';
      let searches;
      if (terms.length === 0) {
        searches = $tw.wiki.filterTiddlers(
          '[!is[system]tags[]][is[system]tags[]][all[shadows]tags[]]',
        );
      } else {
        searches = $tw.wiki.filterTiddlers(
          '[all[]tags[]!is[system]search[' +
            terms +
            ']][all[]tags[]is[system]search[' +
            terms +
            ']][all[shadows]tags[]search[' +
            terms +
            ']]',
        );
      }
      searches = searches.map((s) => {
        return { name: s };
      });
      this.showResults(searches);
    }
    tagListResolver(e) {
      if (this.currentSelection === 0) {
        let input = this.searchContainer.value.substr(1);
        let exist = $tw.wiki.filterTiddlers('[tag[' + input + ']]');
        if (!exist) return;
        this.searchContainer.value = '@' + input;
        return;
      }
      let result = this.currentResults[this.currentSelection - 1];
      this.searchContainer.value = '@' + result.innerText;
      this.onInput(this.searchContainer.value);
    }
    tagProvider(terms) {
      this.currentSelection = 0;
      this.searchHint.innerText = 'Search tiddlers with @tag(s)';
      let searches = [];
      if (terms.length !== 0) {
        let { tags, searchTerms, tagsFilter } = this.parseTags(
          this.searchContainer.value,
        );
        let taggedTiddlers = $tw.wiki.filterTiddlers(tagsFilter);

        if (taggedTiddlers.length !== 0) {
          if (tags.length === 1) {
            let tag = tags[0];
            let tagTiddlerExists = this.tiddlerOrShadowExists(tag);
            if (tagTiddlerExists && searchTerms.some((s) => tag.includes(s)))
              searches.push(tag);
          }
          searches = [...searches, ...taggedTiddlers];
        }
      }
      searches = searches.map((s) => {
        return { name: s };
      });
      this.showResults(searches);
    }

    parseTags(input) {
      let splits = input.split(' ').filter((s) => s !== '');
      let tags = [];
      let searchTerms = [];
      for (let i = 0; i < splits.length; i++) {
        if (splits[i].startsWith('@')) {
          tags.push(splits[i].substr(1));
          continue;
        }
        searchTerms.push(splits[i]);
      }
      let tagsFilter = `[all[tiddlers+system+shadows]${tags.reduce((a, c) => {
        return a + 'tag[' + c + ']';
      }, '')}]`;
      if (searchTerms.length !== 0) {
        tagsFilter = tagsFilter.substr(0, tagsFilter.length - 1); //remove last ']'
        tagsFilter += `search[${searchTerms.join(' ')}]]`;
      }
      return { tags, searchTerms, tagsFilter };
    }

    settingsProvider(terms) {
      this.currentSelection = 0;
      this.searchHint.innerText = 'Select the setting you want to change';
      let isNumerical = (terms) =>
        terms.length !== 0 && terms.match(/\D/gm) === null;
      let isBoolean = (terms) =>
        terms.length !== 0 && terms.match(/(true\b)|(false\b)/gim) !== null;
      this.showResults([
        {
          name:
            'Theme (currently ' + this.settings.theme.match(/[^\/]*$/) + ')',
          action: () => this.promptForThemeSetting(),
        },
        this.settingResultBuilder(
          'Max results',
          'maxResults',
          'Choose the maximum number of results',
          isNumerical,
          'Error: value must be a positive integer',
        ),
        this.settingResultBuilder(
          'Show history on open',
          'showHistoryOnOpen',
          'Chose whether to show the history when you open the palette',
          isBoolean,
          "Error: value must be 'true' or 'false'",
        ),
        this.settingResultBuilder(
          'Escape to go back',
          'escapeGoesBack',
          'Chose whether ESC should go back when possible',
          isBoolean,
          "Error: value must be 'true' or 'false'",
        ),
        this.settingResultBuilder(
          'Use selection as search query',
          'alwaysPassSelection',
          'Chose your current selection is passed to the command palette',
          isBoolean,
          "Error: value must be 'true' or 'false'",
        ),
        this.settingResultBuilder(
          'Never Basic',
          'neverBasic',
          'Chose whether to override basic prompts to show filter operation',
          isBoolean,
          "Error: value must be 'true' or 'false'",
        ),
        this.settingResultBuilder(
          'Field preview max size',
          'maxResultHintSize',
          'Choose the maximum hint length for field preview',
          isNumerical,
          'Error: value must be a positive integer',
        ),
      ]);
    }

    settingResultBuilder(name, settingName, hint, validator, errorMsg) {
      return {
        name: name + ' (currently ' + this.settings[settingName] + ')',
        action: () =>
          this.promptForSetting(settingName, hint, validator, errorMsg),
      };
    }

    settingsResolver(e) {
      if (this.currentSelection === 0) return;
      this.goBack = () => {
        this.searchContainer.value = '|';
        this.blockProviderChange = false;
        this.onInput(this.searchContainer.value);
      };
      this.currentResults[this.currentSelection - 1].result.action();
    }

    promptForThemeSetting() {
      this.blockProviderChange = true;
      this.allowInputFieldSelection = false;
      this.currentProvider = (terms) => {
        this.currentSelection = 0;
        this.searchHint.innerText = 'Choose a theme';
        let defaultValue = this.defaultSettings['theme'];
        let results = [
          {
            name: 'Revert to default value: ' + defaultValue.match(/[^\/]*$/),
            action: () => {
              this.setSetting('theme', defaultValue);
              this.refreshThemes();
            },
          },
        ];
        for (let theme of this.themes) {
          let name = theme.fields.title;
          let shortName = name.match(/[^\/]*$/);
          let action = () => {
            this.setSetting('theme', name);
            this.refreshThemes();
          };
          results.push({ name: shortName, action: action });
        }
        this.showResults(results);
      };
      this.currentResolver = (e) => {
        this.currentResults[this.currentSelection - 1].result.action(e);
      };
      this.searchContainer.value = '';
      this.onInput(this.searchContainer.value);
    }

    //Validator = (terms) => bool
    promptForSetting(settingName, hint, validator, errorMsg) {
      this.blockProviderChange = true;
      this.allowInputFieldSelection = true;
      this.currentProvider = (terms) => {
        this.currentSelection = 0;
        this.searchHint.innerText = hint;
        let defaultValue = this.defaultSettings[settingName];
        let results = [
          {
            name: 'Revert to default value: ' + defaultValue,
            action: () => this.setSetting(settingName, defaultValue),
          },
        ];
        if (!validator(terms)) {
          results.push({ name: errorMsg });
        }
        this.showResults(results);
      };
      this.currentResolver = (e) => {
        if (this.currentSelection === 0) {
          let input = this.searchContainer.value;
          if (validator(input)) {
            this.setSetting(settingName, input);
            this.goBack = undefined;
            this.blockProviderChange = false;
            this.allowInputFieldSelection = false;
            this.promptCommand('|');
          }
        } else {
          let action =
            this.currentResults[this.currentSelection - 1].result.action;
          if (action) {
            action();
            this.goBack = undefined;
            this.blockProviderChange = false;
            this.allowInputFieldSelection = false;
            this.promptCommand('|');
          }
        }
      };
      this.searchContainer.value = this.settings[settingName];
      this.onInput(this.searchContainer.value);
    }

    showResults(results) {
      for (let cur of this.currentResults) {
        cur.remove();
      }
      this.currentResults = [];
      let resultCount = 0;
      for (let result of results) {
        this.addResult(result, resultCount);
        resultCount++;
        if (resultCount >= this.settings.maxResults) break;
      }
    }

    tmMessageBuilder(message, params = {}) {
      return (e) => {
        let event = {
          type: message,
          paramObject: params,
          event: e,
        };
        this.parentWidget.dispatchEvent(event);
      };
    }
    actionProvider(terms) {
      this.currentSelection = 0;
      this.searchHint.innerText = '💻';
      let results;
      if (terms.length === 0) {
        results = this.getCommandHistory();
      } else {
        results = this.actions.filter((a) =>
          a.name.toLowerCase().includes(terms.toLowerCase()),
        );
      }
      this.showResults(results);
    }

    helpProvider(terms) {
      //TODO: tiddlerify?
      this.currentSelection = 0;
      this.searchHint.innerText = '🐚';
      let searches = [
        { name: '... Search', action: () => this.promptCommand('') },
        { name: '> Commands', action: () => this.promptCommand('>') },
        {
          name: '+ Create tiddler with title',
          action: () => this.promptCommand('+'),
        },
        { name: '# Search tags', action: () => this.promptCommand('#') },
        {
          name: '@ List tiddlers with tag',
          action: () => this.promptCommand('@'),
        },
        { name: '[ Filter operation', action: () => this.promptCommand('[') },
        {
          name: '| Command Palette Settings',
          action: () => this.promptCommand('|'),
        },
        {
          name: '\\ Escape first character',
          action: () => this.promptCommand('\\'),
        },
        { name: '? Help', action: () => this.promptCommand('?') },
      ];
      this.prefixes.forEach((p) =>
        searches.push({
          name: p.prefix + ' ' + p.hint,
          action: () => this.promptCommand(p.prefix),
        }),
      );
      this.showResults(searches);
    }

    filterProvider(terms, hint) {
      this.currentSelection = 0;
      this.searchHint.innerText =
        hint === undefined ? 'Filter operation' : hint;
      terms = '[' + terms;
      let fields = $tw.wiki.filterTiddlers('[fields[]]');
      let results = $tw.wiki.filterTiddlers(terms).map((r) => {
        return { name: r };
      });
      let insertResult = (i, result) => results.splice(i + 1, 0, result);
      for (let i = 0; i < results.length; i++) {
        let initialResult = results[i];
        let alreadyMatched = false;
        let date = 'Invalid Date';
        if (initialResult.name.length === 17) {
          //to be sure to only match tiddly dates (17 char long)
          date = $tw.utils.parseDate(initialResult.name).toLocaleString();
        }
        if (date !== 'Invalid Date') {
          results[i].hint = date;
          results[i].action = () => {};
          alreadyMatched = true;
        }
        let isTag =
          $tw.wiki.getTiddlersWithTag(initialResult.name).length !== 0;
        if (isTag) {
          if (alreadyMatched) {
            insertResult(i, { ...results[i] });
            i += 1;
          }
          results[i].action = () =>
            this.promptCommand('@' + initialResult.name);
          results[i].hint = 'Tag'; //Todo more info?
          alreadyMatched = true;
        }
        let isTiddler = this.tiddlerOrShadowExists(initialResult.name);
        if (isTiddler) {
          if (alreadyMatched) {
            insertResult(i, { ...results[i] });
            i += 1;
          }
          results[i].action = () => {
            this.navigateTo(initialResult.name);
            this.closePalette();
          };
          results[i].hint = 'Tiddler';
          alreadyMatched = true;
        }
        let isField = fields.includes(initialResult.name);
        if (isField) {
          if (alreadyMatched) {
            insertResult(i, { ...results[i] });
            i += 1;
          }
          let parsed;
          try {
            parsed = $tw.wiki.parseFilter(this.searchContainer.value);
          } catch (e) {} //The error is already displayed to the user
          let foundTitles = [];
          for (let node of parsed || []) {
            if (node.operators.length !== 2) continue;
            if (
              node.operators[0].operator === 'title' &&
              node.operators[1].operator === 'fields'
            ) {
              foundTitles.push(node.operators[0].operand);
            }
          }
          let hint = 'Field';
          if (foundTitles.length === 1) {
            hint = $tw.wiki.getTiddler(foundTitles[0]).fields[
              initialResult.name
            ];
            if (hint instanceof Date) {
              hint = hint.toLocaleString();
            }
            hint = hint.toString().replace(/(\r\n|\n|\r)/gm, '');
            let maxSize = this.settings.maxResultHintSize - 3;
            if (hint.length > maxSize) {
              hint = hint.substring(0, maxSize);
              hint += '...';
            }
          }
          results[i].hint = hint;
          results[i].action = () => {};
          alreadyMatched = true;
        }
        // let isContentType = terms.includes('content-type');
      }
      this.showResults(results);
    }

    filterResolver(e) {
      if (this.currentSelection === 0) return;
      this.currentResults[this.currentSelection - 1].result.action();
      e.stopPropagation();
    }

    helpResolver(e) {
      if (this.currentSelection === 0) return;
      this.currentResults[this.currentSelection - 1].result.action();
      e.stopPropagation();
    }

    createTiddlerProvider(terms) {
      this.currentSelection = 0;
      this.searchHint.innerText = '🟦';
      this.showResults([]);
    }

    createTiddlerResolver(e) {
      let { tags, searchTerms } = this.parseTags(
        this.searchContainer.value.substr(1),
      );
      let title = searchTerms.join(' ');
      tags = tags.join(' ');
      this.tmMessageBuilder('tm-new-tiddler', { title: title, tags: tags })(e);
      this.closePalette();
    }

    promptCommand(value, caret) {
      this.blockProviderChange = false;
      this.searchContainer.value = value;
      this.searchContainer.focus();
      if (caret !== undefined) {
        this.searchContainer.setSelectionRange(caret, caret);
      }
      this.onInput(this.searchContainer.value);
    }

    promptCommandBasic(value, caret, hint) {
      if (
        this.settings.neverBasic === 'true' ||
        this.settings.neverBasic === true
      ) {
        //TODO: validate settings to avoid unnecessary checks
        this.promptCommand(value, caret);
        return;
      }
      this.searchContainer.value = '';
      this.blockProviderChange = true;
      this.currentProvider = this.basicProviderBuilder(value, caret, hint);
      this.onInput(this.searchContainer.value);
    }

    basicProviderBuilder(value, caret, hint) {
      let start = value.substr(0, caret);
      let end = value.substr(caret);
      return (input) => {
        let { resolver, provider, terms } = this.parseCommand(
          start + input + end,
        );
        let backgroundProvider = provider;
        backgroundProvider(terms, hint);
        this.currentResolver = resolver;
      };
    }

    prefixedBasicProviderBuilder(value, caret, hint, prefixLength) {
      let start = value.substr(0, caret);
      let end = value.substr(caret);
      return (input) => {
        input = input.substring(prefixLength);
        let { resolver, provider, terms } = this.parseCommand(
          start + input + end,
        );
        let backgroundProvider = provider;
        backgroundProvider(terms, hint);
        this.currentResolver = resolver;
      };
    }

    getCommandHistory() {
      this.history = this.history.filter((h) =>
        this.actions.some((a) => a.name === h),
      ); //get rid of deleted command that are still in history;
      let results = this.history.map((h) =>
        this.actions.find((a) => a.name === h),
      );
      while (results.length <= this.settings.maxResults) {
        let nextDefaultAction = this.actions.find((a) => !results.includes(a));
        if (nextDefaultAction === undefined) break;
        results.push(nextDefaultAction);
      }
      return results;
    }
    actionResolver(e) {
      if (this.currentSelection === 0) return;
      let result = this.actions.find(
        (a) =>
          a.name === this.currentResults[this.currentSelection - 1].innerText,
      );
      if (result.keepPalette) {
        let curInput = this.searchContainer.value;
        this.goBack = () => {
          this.searchContainer.value = curInput;
          this.blockProviderChange = false;
          this.onInput(this.searchContainer.value);
        };
      }
      this.updateCommandHistory(result);
      result.action(e);
      e.stopPropagation();
      if (result.immediate) {
        this.validateSelection(e);
        return;
      }
      if (!result.keepPalette) {
        this.closePalette();
      }
    }

    /*
      Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
      */
    refresh() {
      return false;
    }
  }

  exports.commandpalettewidget = CommandPaletteWidget;
})();
