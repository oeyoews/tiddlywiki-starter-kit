/*\
title: $:/plugins/oeyoews/notebook-theme-sidebar-resizer/widget.js
type: application/javascript
module-type: widget

notebook-theme-sidebar-resizer widget
\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const en = require('./locales/en');

class NotebookResizer extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    // static
    this.VANILLA = 'vanilla';
    this.NOTEBOOK = 'notebook';
    this.LEFT = 'left';
    this.RIGHT = 'right';
    // default
    this.defaultWidthTiddler =
      '$:/themes/tiddlywiki/vanilla/metrics/sidebarwidth';
    this.nbWidthTiddler =
      '$:/plugins/oeyoews/notebook-theme-sidebar-resizer/default-sidebar-width';
    this.themeTiddler = '$:/theme';
    this.theme = null;
    this.isResizing = false;
    this.width = 0;
    this.defaultStateTiddler = '$:/state/sidebar';

    // theme: whitespace
    this.whitespace = {
      name: 'WHITESPACE',
      theme: '$:/themes/jd/Whitespace',
      positionTiddler: '$:/config/Whitespace/sidebar',
      widthTiddler: this.defaultWidthTiddler,
    };

    this.sidebarLayoutTiddler =
      '$:/themes/tiddlywiki/vanilla/options/sidebarlayout';
    this.notebookWidthTiddler = '$:/themes/nico/notebook/metrics/sidebar-width';
    this.positionTiddler = '$:/themes/nico/notebook/metrics/sidebar-position';
    this.notebookStateSidebar = '$:/state/notebook-sidebar';
    // listen tiddlers
    this.listenTiddlers = [
      this.positionTiddler,
      '$:/language',
      '$:/layout',
      this.themeTiddler,
      this.whitespace.positionTiddler,
      this.sidebarLayoutTiddler,
    ];
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    // this.checker();
    // update theme
    const theme = this.checkTheme();
    this.theme = theme;
    // after update this.theme
    this.presetForVanillaTheme();

    // NOTE: Tailwindcss class here, if you dont want install the extra tailwindcss dependency, you can rewrite it use general style()
    const resizer = createElement('div', {
      class: 'oresizer',
    });

    if (this.getSidebarPosition() === this.LEFT) {
      resizer.classList.add('oresizer-right');
    } else {
      resizer.classList.add('oresizer-left');
    }

    resizer.addEventListener('pointerdown', (e) => {
      e.preventDefault(); // prevent select text on move sidebar width

      this.isResizing = true;
      document.addEventListener('pointermove', (e) => this.resize(e));
      document.addEventListener('pointerup', (e) => this.stopResize(e));
    });

    parent.insertBefore(resizer, nextSibling);
    this.domNodes.push(resizer);
  }

  checkTheme() {
    const name = this.getText(this.themeTiddler);

    // notebook
    if (
      name === '$:/themes/nico/notebook' ||
      name === '$:/themes/oeyoews/notebook-plus' // for my custom notebook theme
    ) {
      return this.NOTEBOOK;
    }

    // whitespace
    if (name == this.whitespace.theme) {
      return this.whitespace.name;
    }

    // vanilla
    return this.VANILLA;
  }

  presetForVanillaTheme() {
    const sidebarLayout = this.getText(this.sidebarLayoutTiddler);

    if (this.theme === this.VANILLA) {
      if (sidebarLayout !== 'fluid-fixed') {
        console.warn('you should set sidebar layout to fluid-fixed');
        $tw.wiki.setText(this.sidebarLayoutTiddler, null, null, 'fluid-fixed');
      }
    }
  }

  getText(tiddler) {
    return $tw.wiki.getTiddlerText(tiddler);
  }

  getSidebarPosition() {
    // NOTE: before vanilla adjust
    if (this.getText(this.themeTiddler) === '$:/themes/cdr/captivate') {
      return this.LEFT;
    }

    if (this.theme === this.whitespace.name) {
      if (!$tw.wiki.tiddlerExists(this.whitespace.positionTiddler)) {
        return this.LEFT;
      }
      return this.getText(this.whitespace.positionTiddler);
    }

    if (this.theme === this.VANILLA) {
      return this.RIGHT;
    }

    // notebook
    if (!$tw.wiki.tiddlerExists(this.positionTiddler)) {
      return this.LEFT;
    }

    const { position = this.LEFT } = $tw.wiki.getTiddler(
      this.positionTiddler,
    ).fields;

    return position;
  }

  getDefaultSidebarWidth() {
    return this.getText(this.nbWidthTiddler).replace('px', '');
  }

  resize(e) {
    const clientX = e.clientX;
    if (this.isResizing) {
      if (this.getSidebarPosition() === this.LEFT) {
        this.width = clientX;
      } else {
        this.width = window.innerWidth - clientX;
      }
      if (this.width / window.innerWidth > 0.75) {
        return;
      }
      if (this.width / window.innerWidth < 0.05) {
        this.closeSidebar();
        this.isResizing = false;
        return;
      }
      this.updateSidebarWidth(this.width);
    }
  }

  stopResize(e) {
    this.isResizing = false;
    document.removeEventListener('pointermove', (e) => this.resize(e));
  }

  closeSidebar() {
    const stateTiddler =
      this.theme === this.NOTEBOOK
        ? this.notebookStateSidebar
        : this.defaultStateTiddler;
    $tw.wiki.setText(stateTiddler, 'text', null, 'no');
    this.updateSidebarWidth(this.getDefaultSidebarWidth());
  }

  updateSidebarWidth(width) {
    const targetTiddler =
      this.theme === this.NOTEBOOK
        ? this.notebookWidthTiddler
        : this.defaultWidthTiddler;
    requestAnimationFrame(() => {
      $tw.wiki.setText(
        targetTiddler,
        null,
        null,
        `${Number(width).toFixed(0)}px`,
      );
    });
  }

  checker() {
    const logger = new $tw.utils.Logger(en.pluginname);
    if (!$tw.modules.titles['tailwindcss.min.js']) {
      logger.alert(en.warning);
    }
  }

  shouldRefresh(changedTiddlers, tiddlerList) {
    const changedKeys = Object.keys(changedTiddlers);
    return tiddlerList.some((tiddler) => changedKeys.includes(tiddler));
  }

  refresh(changedTiddlers) {
    // TODO: refresh on change tw languages
    if (this.shouldRefresh(changedTiddlers, this.listenTiddlers)) {
      this.refreshSelf();
      console.warn('refresh', new Date());
      return true;
    }
    return false;
  }
}

exports.nbresizer = NotebookResizer;
