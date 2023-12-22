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
    this.VANILLA = 'vanilla';
    this.NOTEBOOK = 'notebook';
    this.themeTiddler = '$:/theme';
    this.theme = null;
    this.sidebarLayoutTiddler =
      '$:/themes/tiddlywiki/vanilla/options/sidebarlayout';
    this.isResizing = false;
    this.notebookWidthTiddler = '$:/themes/nico/notebook/metrics/sidebar-width';
    this.vanillaWidthTiddler =
      '$:/themes/tiddlywiki/vanilla/metrics/sidebarwidth';
    this.positionTiddler = '$:/themes/nico/notebook/metrics/sidebar-position';
    this.notebookStateSidebar = '$:/state/notebook-sidebar';
    this.vanillaStateSidebar = '$:/state/sidebar';
    this.defaultTiddler =
      '$:/plugins/oeyoews/notebook-theme-sidebar-resizer/default-sidebar-width';
    this.width = 0;
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    this.checker();
    // update theme
    const theme = this.checkTheme();
    this.theme = theme;
    // after update this.theme
    this.presetForVanillaTheme();

    const createElement = $tw.utils.domMaker;

    // NOTE: Tailwindcss class here, if you dont want install the extra tailwindcss dependency, you can rewrite it use general style()
    const resizer = createElement('div', {
      class:
        'hover:cursor-ew-resize bg-gray-100 dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-all h-full w-[5px] absolute top-0',
    });

    if (this.getSidebarPosition() === 'left') {
      resizer.classList.add('right-0');
    } else {
      resizer.classList.add('left-0');
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
    const currentTiddler = $tw.wiki.getTiddlerText(this.themeTiddler);
    if (
      currentTiddler === '$:/themes/nico/notebook' ||
      currentTiddler === '$:/themes/oeyoews/notebook-plus' // for my custom notebook theme
    ) {
      return this.NOTEBOOK;
    } else {
      return this.VANILLA;
    }
  }

  presetForVanillaTheme() {
    const sidebarLayout = $tw.wiki.getTiddlerText(this.sidebarLayoutTiddler);
    if (this.theme === this.VANILLA) {
      if (sidebarLayout !== 'fluid-fixed') {
        console.warn('you should set sidebar layout to fluid-fixed');
        $tw.wiki.setText(this.sidebarLayoutTiddler, null, null, 'fluid-fixed');
      }
    }
  }

  getSidebarPosition() {
    if (this.theme === this.VANILLA) {
      return 'right';
    }
    if (!$tw.wiki.tiddlerExists(this.positionTiddler)) {
      return 'left';
    }
    const { position = 'left' } = $tw.wiki.getTiddler(
      this.positionTiddler,
    ).fields;
    return position;
  }

  getDefaultSidebarWidth() {
    return $tw.wiki.getTiddlerText(this.defaultTiddler).replace('px', '');
  }

  resize(e) {
    const clientX = e.clientX;
    if (this.isResizing) {
      if (this.getSidebarPosition() === 'left') {
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
        : this.vanillaStateSidebar;
    $tw.wiki.setText(stateTiddler, 'text', null, 'no');
    this.updateSidebarWidth(this.getDefaultSidebarWidth());
  }

  updateSidebarWidth(width) {
    const targetTiddler =
      this.theme === this.NOTEBOOK
        ? this.notebookWidthTiddler
        : this.vanillaWidthTiddler;
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

  refresh(changedTiddlers) {
    // TODO: refresh on change tw languages
    const tiddlers = Object.keys(changedTiddlers);
    if (
      tiddlers.includes(this.positionTiddler) ||
      tiddlers.includes('$:/language') ||
      tiddlers.includes(this.themeTiddler) ||
      tiddlers.includes(this.sidebarLayoutTiddler)
    ) {
      this.refreshSelf();
      return true;
    }
    return false;
  }
}

exports.nbresizer = NotebookResizer;
