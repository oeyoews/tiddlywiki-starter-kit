/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/widget.js
type: application/javascript
module-type: widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DaylightWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      const { toggleMode } = require('./daylight-listener');

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const createElement = $tw.utils.domMaker;
      const wiki = $tw.wiki;

      const getIcon = (mode) =>
        wiki.getTiddlerText('$:/plugins/oeyoews/tiddlywiki-daylight/' + mode);

      const { btn, class: classNames } = this.attributes;

      // NOTE: 由于require不会多次加载, 所以如果这个节点是require过来的, 永远不会被刷新
      function createThemeSpan(theme) {
        const storageTheme = localStorage.theme || 'system';

        const icon = getIcon(theme);
        const spanNode = createElement('span', {
          class: storageTheme === theme ? '' : 'hidden',
        });
        spanNode.innerHTML = icon;
        return spanNode;
      }

      const lightNode = createThemeSpan('light');
      const darkNode = createThemeSpan('dark');
      const systemNode = createThemeSpan('system');

      const domNode = createElement('button', {
        class: 'bg-transparent m-0 p-0',
        children: [systemNode, lightNode, darkNode],
      });

      btn && domNode.classList.remove('bg-transparent');
      btn && domNode.classList.add('aspect-square');
      classNames && domNode.classList.add(...classNames.split(' '));

      domNode.addEventListener('click', () => {
        toggleMode();
        this.refreshSelf();
      });

      // 仅仅刷新ui, 不更新配置
      window.addEventListener('storage', (event) => {
        if (event.oldValue !== event.newValue) {
          if (['system', 'light', 'dark'].includes(event.newValue)) {
            this.refreshSelf();
          }
        }
      });

      // 右键配置palette
      domNode.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        $tw.modal.display('$:/plugins/oeyoews/tiddlywiki-daylight/config');
      });

      /* const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
      mediaQuery?.addEventListener?.('change', () => {
        // TODO: 由于change不会修改配置, 所以class没有变化， ui也没有变化
        this.refreshSelf();
      }); */

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    }

    // TODO: when changes listener is triggered, widget dont refresh, because it also is config
    // tailwindcss example: 如果是system, 直接删除了localStorage.theme
    refresh() {
      return false;
    }
  }

  exports.daylight = DaylightWidget;
})();
