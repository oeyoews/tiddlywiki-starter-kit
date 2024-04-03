/*\
title: $:/plugins/oeyoews/tiddlywiki-motion/Motion.js
type: application/javascript
module-type: library

\*/
module.exports = class Motion {
  constructor() {
    this.prefix = '$:/plugins/oeyoews/tiddlywiki-motion';
    this.selectedStateTiddlerTitle =
      '$:/state/plugins/oeyoews/tiddlywiki-motion/selected';
    this.shortcuts = null;
  }
  init() {
    require('./library/mousetrap.min.js');
    if (!window.Mousetrap) {
      console.warn('no mousetrap');
      return;
    }
    this.navigatorWidget = this.getNavigatorWidget($tw.rootWidget);
    $tw.hooks.addHook(
      'th-closing-tiddler',
      this.handleClosingTiddler.bind(this),
    );

    this.shortcuts = this.getShortcuts();

    // bindings
    const shortcutsArray = Object.entries(this.shortcuts);
    shortcutsArray.forEach(([name, handler]) => {
      const shortcut = this.getSetting(`Shortcuts/${name}/Key`);
      Mousetrap.bind(shortcut, handler);
    });
  }

  /* some aid method */
  getSetting(name) {
    return $tw.wiki.getTiddlerText(this.getPluginTitle(`config/${name}`));
  }

  getPluginTitle(title) {
    return `${this.prefix}/${title}`;
  }

  handleClosingTiddler(event) {
    const selectedTiddler = $tw.wiki.getTiddlerText(
      this.selectedStateTiddlerTitle,
    );
    if (event.param == selectedTiddler) {
      $tw.wiki.deleteTiddler(this.selectedStateTiddlerTitle);
    }
    return event;
  }

  toggleTiddler(title) {
    if ($tw.wiki.getTiddlerText(`$:/state/folded/${title}`) == 'hide') {
      this.unfoldTiddler(title);
    } else {
      this.foldTiddler(title);
    }
  }

  foldTiddler(title) {
    $tw.wiki.setText(`$:/state/folded/${title}`, 'text', null, 'hide');
  }

  unfoldTiddler(title) {
    $tw.wiki.deleteTiddler(`$:/state/folded/${title}`);
  }
  toggleLayout(
    targetLayout = '$:/plugins/oeyoews/neotw/modules/landing/layout',
  ) {
    const layout = $tw.wiki.getTiddlerText('$:/layout');
    const vanillaLayout = '$:/core/ui/PageTemplate';
    if (layout == vanillaLayout) {
      $tw.wiki.setText('$:/layout', 'text', null, targetLayout);
    }
    if (layout == targetLayout) {
      $tw.wiki.setText('$:/layout', 'text', null, vanillaLayout);
    }
  }
  // toggle notebook-sidebar
  toggleSidebar(session) {
    if ($tw.wiki.getTiddlerText(`$:/state/notebook-sidebar`) == 'yes') {
      $tw.wiki.setText(`$:/state/notebook-sidebar`, 'text', null, 'no');
    } else {
      $tw.wiki.setText(`$:/state/notebook-sidebar`, 'text', null, 'yes');
      session &&
        $tw.wiki.setText(
          `$:/state/notebook-sidebar-section`,
          'text',
          null,
          '$:/core/ui/SideBar/' + session,
        );
    }
  }
  getNavigatorWidget(widget) {
    const child = widget.children[0];
    if (child.parseTreeNode.type == 'navigator') {
      return child;
    }
    return this.getNavigatorWidget(child);
  }
  getTiddlerElement(title) {
    return document.querySelector(
      `[data-tiddler-title="${CSS.escape(title)}"]`,
    );
  }
  focusTiddler(title) {
    const focusedTitle = this.getTiddlerElement(title);
    const focusSelected = this.getSetting('FocusSelected');
    if (focusedTitle && focusSelected === 'true') {
      focusedTitle.tabIndex = -1;
      focusedTitle.focus();
    }
  }

  getShortcuts() {
    return {
      ShowHelp: () => {
        this.navigatorWidget.dispatchEvent({
          type: 'tm-modal',
          param: this.getPluginTitle('Help'),
        });
        return false;
      },
      /* ShowFancybox: () => {
        this.navigatorWidget.dispatchEvent({ type: 'om-fancybox' });
        return false;
      }, */
      /* ShowCopyButton: () => {
        this.navigatorWidget.dispatchEvent({ type: 'om-copy-code' });
        return false;
      }, */
      Fullscreen: () => {
        this.navigatorWidget.dispatchEvent({ type: 'tm-full-screen' });
        return false;
      },
      FocusSearch: () => {
        this.navigatorWidget.dispatchEvent({
          type: 'tm-focus-selector',
          param: '.nc-topbar-wrapper input',
        });
        return false;
      },
      CreateNewTiddler: () => {
        const newTiddler = {
          title: '',
          text: '',
          type: 'text/markdown', // Set the content type to text/markdown
        };
        this.navigatorWidget.dispatchEvent({
          // param: 'template',
          type: 'tm-new-tiddler',
          paramObject: newTiddler, // Pass the new tiddler object as paramObject
        });
        return false;
      },
      DeleteTiddler: () => {
        let selectedTiddler =
          $tw.wiki.getTiddlerText(this.selectedStateTiddlerTitle) || '';
        if (!selectedTiddler) {
          return;
        }
        this.navigatorWidget.dispatchEvent({
          type: 'tm-delete-tiddler',
          param: selectedTiddler,
        });
        return false;
      },
      RefreshWiki: () => {
        this.navigatorWidget.dispatchEvent({
          type: 'tm-browser-refresh',
        });
        return false;
      },
      SaveWiki: () => {
        this.navigatorWidget.dispatchEvent({ type: 'tm-save-wiki' });
        return false;
      },
      SelectNextTiddler: () => {
        let selectedTiddler =
          $tw.wiki.getTiddlerText(this.selectedStateTiddlerTitle) || '';
        const storyList = this.navigatorWidget.story.getStoryList();
        if (!storyList.length) {
          return;
        }
        let currentTiddlerIndex = storyList.indexOf(selectedTiddler);
        let nextTiddlerIndex;
        if (currentTiddlerIndex < 0) {
          nextTiddlerIndex = 0;
        } else {
          nextTiddlerIndex = Math.min(
            currentTiddlerIndex + 1,
            storyList.length - 1,
          );
        }
        selectedTiddler = storyList[nextTiddlerIndex];
        $tw.wiki.addTiddler({
          title: this.selectedStateTiddlerTitle,
          text: selectedTiddler,
        });
        this.navigatorWidget.dispatchEvent({
          type: 'tm-navigate',
          navigateTo: selectedTiddler,
        });
        this.focusTiddler(selectedTiddler);
        return false;
      },
      SelectPreviousTiddler: () => {
        let selectedTiddler =
          $tw.wiki.getTiddlerText(this.selectedStateTiddlerTitle) || '';
        const storyList = this.navigatorWidget.story.getStoryList();
        if (!storyList.length) {
          return;
        }
        let currentTiddlerIndex = storyList.indexOf(selectedTiddler);
        let nextTiddlerIndex;
        if (currentTiddlerIndex < 0) {
          nextTiddlerIndex = 0;
        } else {
          nextTiddlerIndex = Math.max(currentTiddlerIndex - 1, 0);
        }
        selectedTiddler = storyList[nextTiddlerIndex];
        $tw.wiki.addTiddler({
          title: this.selectedStateTiddlerTitle,
          text: selectedTiddler,
        });
        this.navigatorWidget.dispatchEvent({
          type: 'tm-navigate',
          navigateTo: selectedTiddler,
        });
        this.focusTiddler(selectedTiddler);
        return false;
      },
      GoToGettingStarted: () => {
        const gettingstarted = 'GettingStarted';
        this.navigatorWidget.dispatchEvent({
          type: 'tm-navigate',
          navigateTo: gettingstarted,
        });
        return false;
      },
      GoToPlugins: () => {
        this.navigatorWidget.dispatchEvent({
          type: 'tm-navigate',
          navigateTo: '$:/core/ui/ControlPanel/Plugins',
        });
        return false;
      },
      GoToSearch: () => {
        this.navigatorWidget.dispatchEvent({
          type: 'tm-navigate',
          navigateTo: '$:/AdvancedSearch',
        });
        return false;
      },
      GoToControlPanel: () => {
        const controlpanel = '$:/ControlPanel';
        this.navigatorWidget.dispatchEvent({
          type: 'tm-navigate',
          navigateTo: controlpanel,
        });
        return false;
      },
      GoToInbox: () => {
        const hasProjectify = $tw.wiki.getTiddler('$:/plugins/nico/projectify');
        const dashboard = '$:/plugins/nico/projectify/ui/dashboard/Dashboard';
        if (!hasProjectify) return;
        this.navigatorWidget.dispatchEvent({
          type: 'tm-navigate',
          navigateTo: dashboard,
        });
        this.focusTiddler(dashboard);
        return false;
      },
      GoToFirstTiddler: () => {
        const storyList = this.navigatorWidget.story.getStoryList();
        if (!storyList.length) {
          return;
        }
        const selectedTiddler = storyList[0];
        $tw.wiki.addTiddler({
          title: this.selectedStateTiddlerTitle,
          text: selectedTiddler,
        });
        this.navigatorWidget.dispatchEvent({
          type: 'tm-navigate',
          navigateTo: selectedTiddler,
        });
        this.focusTiddler(selectedTiddler);
        return false;
      },
      GoToLastTiddler: () => {
        const storyList = this.navigatorWidget.story.getStoryList();
        if (!storyList.length) {
          return;
        }
        const selectedTiddler = storyList[storyList.length - 1];
        $tw.wiki.addTiddler({
          title: this.selectedStateTiddlerTitle,
          text: selectedTiddler,
        });
        this.navigatorWidget.dispatchEvent({
          type: 'tm-navigate',
          navigateTo: selectedTiddler,
        });
        this.focusTiddler(selectedTiddler);
        return false;
      },
      EditTiddler: () => {
        const selectedTiddler = $tw.wiki.getTiddlerText(
          this.selectedStateTiddlerTitle,
        );
        if (!selectedTiddler) {
          return;
        }
        this.navigatorWidget.dispatchEvent({
          type: 'tm-edit-tiddler',
          param: selectedTiddler,
        });
        return false;
      },
      CloseTiddler: () => {
        const selectedTiddler = $tw.wiki.getTiddlerText(
          this.selectedStateTiddlerTitle,
        );
        if (!selectedTiddler) {
          return;
        }
        this.navigatorWidget.dispatchEvent({
          type: 'tm-close-tiddler',
          param: selectedTiddler,
        });
        return false;
      },
      CloseAllTiddlers: () => {
        this.navigatorWidget.dispatchEvent({ type: 'tm-close-all-tiddlers' });
        return false;
      },
      TogglePalette: () => {
        this.navigatorWidget.dispatchEvent({ type: 'om-toggle-theme' });
        new $tw.Notify().display({
          title: `🎨 Toggle Theme`,
          icon: 'success',
        });
        return false;
      },
      ToggleTiddler: () => {
        const selectedTiddler = $tw.wiki.getTiddlerText(
          this.selectedStateTiddlerTitle,
        );
        if (!selectedTiddler) {
          return;
        }
        this.toggleTiddler(selectedTiddler);
        return false;
      },
      UnfoldTiddler: () => {
        const selectedTiddler = $tw.wiki.getTiddlerText(
          this.selectedStateTiddlerTitle,
        );
        if (!selectedTiddler) {
          return;
        }
        this.unfoldTiddler(selectedTiddler);
        return false;
      },
      FoldTiddler: () => {
        const selectedTiddler = $tw.wiki.getTiddlerText(
          this.selectedStateTiddlerTitle,
        );
        if (!selectedTiddler) {
          return;
        }
        this.foldTiddler(selectedTiddler);
        return false;
      },
      // toggle sidebar
      ToggleSidebar: () => {
        this.toggleSidebar();
        return false;
      },
      ToggleOpen: () => {
        this.toggleSidebar('Open');
        return false;
      },
      ToggleAllTiddlers: () => {
        const storyList = this.navigatorWidget.story.getStoryList();
        for (const title of storyList) {
          this.toggleTiddler(title);
        }
        return false;
      },
      FoldAllTiddlers: () => {
        const storyList = this.navigatorWidget.story.getStoryList();
        for (const title of storyList) {
          this.foldTiddler(title);
        }
        return false;
      },
      UnfoldAllTiddlers: () => {
        const storyList = this.navigatorWidget.story.getStoryList();
        for (const title of storyList) {
          this.unfoldTiddler(title);
        }
        return false;
      },
      // TODO should use keypress, not keydown
      Dismiss: () => {
        // Close help modal if it's open.
        // HACK: Close the modal by clicking the button to dispatch the internal
        // tm-close-tiddler message.
        const button = document.querySelector('.tc-modal-header button');
        if (button) {
          button.click();
        }
        // Deselect tiddler.
        $tw.wiki.deleteTiddler(this.selectedStateTiddlerTitle);
      },
    };
  }
};
