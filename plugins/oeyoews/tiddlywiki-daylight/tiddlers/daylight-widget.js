/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/widget.js
type: application/javascript
module-type: widget

\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class DaylightWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const { toggleMode } = require('./daylight-listener');
    const createElement = $tw.utils.domMaker;
    const wiki = $tw.wiki;

    const getIcon = (mode) =>
      wiki.getTiddlerText('$:/plugins/oeyoews/tiddlywiki-daylight/' + mode);

    const { btn, class: classNames } = this.attributes;

    // NOTE: 由于 require 不会多次加载，所以如果这个节点是 require 过来的，永远不会被刷新
    function createThemeSpan(theme) {
      const storageTheme = localStorage.theme || 'system';

      const icon = getIcon(theme);
      const spanNode = createElement('span', {
        class: storageTheme === theme ? '' : 'hidden'
      });
      spanNode.innerHTML = icon;
      return spanNode;
    }

    const lightNode = createThemeSpan('light');
    const darkNode = createThemeSpan('dark');
    const systemNode = createThemeSpan('system');

    const domNode = createElement('button', {
      class: 'bg-transparent m-0 p-0',
      children: [systemNode, lightNode, darkNode]
    });

    btn &&
      domNode.classList.remove('bg-transparent') &&
      domNode.classList.add('aspect-square');
    classNames && domNode.classList.add(...classNames.split(' '));

    domNode.addEventListener('click', () => {
      toggleMode();
      new $tw.Notify().display({ title: '更新模式' });
      this.refreshSelf();
    });

    // 仅仅刷新 ui, 不更新配置
    window.addEventListener('storage', (event) => {
      if (event.oldValue !== event.newValue) {
        if (['system', 'light', 'dark'].includes(event.newValue)) {
          this.refreshSelf();
        }
      }
    });

    // 右键配置 palette
    domNode.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      // tw5-typed not include this yet
      $tw.modal.display('$:/plugins/oeyoews/tiddlywiki-daylight/config');
    });

    /* const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
      mediaQuery?.addEventListener?.('change', () => {
        // TODO: 由于 change 不会修改配置，所以 class 没有变化，ui 也没有变化
        this.refreshSelf();
      }); */

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }

  // TODO: when changes listener is triggered, widget dont refresh, because it also is config
  // tailwindcss example: 如果是 system, 直接删除了 localStorage.theme
  refresh() {
    return false;
  }
}

exports.daylight = DaylightWidget;
