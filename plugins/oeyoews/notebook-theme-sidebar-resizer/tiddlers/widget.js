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
    this.leftClass = 'oresizer-left';
    this.rightClass = 'oresizer-right';
    this.VANILLA = 'vanilla';
    this.NOTEBOOK = 'notebook';
    this.LEFT = 'left';
    this.RIGHT = 'right';

    // static
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

    // notebook
    this.notebook = {
      name: 'NOTEBOOK',
      theme: [
        '$:/themes/nico/notebook',
        '$:/themes/oeyoews/notebook-plus' // for my custom notebook theme
      ],
      stateTiddler: '$:/state/notebook-sidebar',
      widthTiddler: '$:/themes/nico/notebook/metrics/sidebar-width',
      positionTiddler: '$:/themes/nico/notebook/metrics/sidebar-position'
    };

    // theme: whitespace
    this.whitespace = {
      name: 'WHITESPACE',
      theme: '$:/themes/jd/Whitespace',
      positionTiddler: '$:/config/Whitespace/sidebar',
      widthTiddler: this.defaultWidthTiddler
    };

    this.sidebarLayoutTiddler =
      '$:/themes/tiddlywiki/vanilla/options/sidebarlayout';

    this.user = {
      widthTiddler: '',
      statusTiddler: '',
      close: ''
    };
    // listen tiddlers
    this.listenTiddlers = [
      this.notebook.positionTiddler,
      '$:/language',
      '$:/layout',
      this.themeTiddler,
      this.whitespace.positionTiddler,
      this.sidebarLayoutTiddler,
      this.user.statusTiddler
    ];
    this.position = this.RIGHT;
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    // this.checker();
    this.checkTheme(); // 01: update theme
    this.updatePosition(); // 02: update position
    // after update this.theme
    this.presetForVanillaTheme();

    const { position, widthTiddler, close, statusTiddler } = this.attributes;
    if (position) {
      this.position = position;
    }

    if (widthTiddler) {
      this.user.widthTiddler = widthTiddler;
    }
    if (close) {
      this.user.close = close;
    }
    if (statusTiddler) {
      this.user.statusTiddler = statusTiddler;
    }

    // NOTE: Tailwindcss class here, if you dont want install the extra tailwindcss dependency, you can rewrite it use general style()
    const resizer = createElement('div', {
      class: 'oresizer'
    });

    switch (this.LEFT) {
      case this.position:
        resizer.classList.add(this.rightClass);
        break;
      default:
        resizer.classList.add(this.leftClass);
        break;
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
    // NOTE: $:/theme 条目可能会不存在
    const theme = this.getText(this.themeTiddler) || this.VANILLA;

    switch (theme) {
      case this.notebook.theme[0]:
      case this.notebook.theme[1]:
        this.theme = this.notebook.name;
        break;
      case this.whitespace.theme:
        this.theme = this.whitespace.name;
        break;
      case this.VANILLA:
        this.theme = this.VANILLA;
      default:
        break;
    }
  }

  presetForVanillaTheme() {
    const sidebarLayout = this.getText(this.sidebarLayoutTiddler);

    if (this.theme === this.VANILLA) {
      if (sidebarLayout !== 'fluid-fixed') {
        console.warn('you should set sidebar layout to fluid-fixed');
        $tw.wiki.setText(
          this.sidebarLayoutTiddler,
          'text',
          null,
          'fluid-fixed'
        );
      }
    }
  }

  // base theme to get sidebarpositon
  updatePosition() {
    // NOTE: before vanilla adjust
    if (this.getText(this.themeTiddler) === '$:/themes/cdr/captivate') {
      this.position = this.LEFT;
      return;
    }

    switch (this.theme) {
      case this.whitespace.name:
        if (!$tw.wiki.tiddlerExists(this.whitespace.positionTiddler)) {
          this.position = this.LEFT;
        }
        this.position = this.getText(this.whitespace.positionTiddler);
        break;

      case this.notebook.name:
        if (!$tw.wiki.tiddlerExists(this.notebook.positionTiddler)) {
          this.position = this.LEFT;
        } else {
          const { position = this.LEFT } = $tw.wiki.getTiddler(
            this.notebook.positionTiddler
          ).fields;

          this.position = position;
        }

        break;
      case this.VANILLA:
        this.position = this.RIGHT;
        break;
      default:
        break;
    }
  }

  getDefaultSidebarWidth() {
    return this.getText(this.nbWidthTiddler).replace('px', '');
  }

  getText(tiddler) {
    return $tw.wiki.getTiddlerText(tiddler);
  }

  resize(e) {
    const clientX = e.clientX;
    if (this.isResizing) {
      if (this.position === this.LEFT) {
        this.width = clientX;
      } else {
        this.width = window.innerWidth - clientX;
      }
      if (this.width / window.innerWidth > 0.5) {
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
    // 监听事件的this 指向全局window, 如果希望指向当前 class 的this , 可以使用箭头函数, 或者手动修改this 指向
    document.removeEventListener('pointermove', (e) => this.resize(e));
  }

  closeSidebar() {
    let stateTiddler =
      this.theme === this.notebook.name
        ? this.notebook.stateTiddler
        : this.defaultStateTiddler;
    // NOTE: leftbar plugini use show/hide not yes/no
    if (this.user.statusTiddler) {
      stateTiddler = this.user.statusTiddler;
      $tw.wiki.setText(stateTiddler, 'text', null, this.user.close);
    } else {
      $tw.wiki.setText(stateTiddler, 'text', null, 'no');
      this.updateSidebarWidth(this.getDefaultSidebarWidth());
    }
  }

  updateSidebarWidth(width) {
    let targetTiddler =
      this.theme === this.notebook.name
        ? this.notebook.widthTiddler
        : this.defaultWidthTiddler;

    if (this.user.widthTiddler) {
      targetTiddler = this.user.widthTiddler;
    }

    requestAnimationFrame(() => {
      $tw.wiki.setText(
        targetTiddler,
        null,
        null,
        `${Number(width).toFixed(0)}px`,
        {
          suppressTimestamp: true
        }
      );
    });
  }

  /*   checker() {
    const logger = new $tw.utils.Logger(en.pluginname);
    if (!$tw.modules.titles['tailwindcss.min.js']) {
      logger.alert(en.warning);
    }
  }
 */
  shouldRefresh(changedTiddlers, tiddlerList) {
    const changedKeys = Object.keys(changedTiddlers);
    return tiddlerList.some((tiddler) => changedKeys.includes(tiddler));
  }

  refresh(changedTiddlers) {
    if (this.shouldRefresh(changedTiddlers, this.listenTiddlers)) {
      this.refreshSelf();
      return true;
    }
    return false;
  }
}

exports.nbresizer = NotebookResizer;
