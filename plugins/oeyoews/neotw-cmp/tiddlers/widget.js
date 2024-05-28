/*\
title: $:/plugins/oeyoews/neotw-cmp/widget.js
type: application/javascript
module-type: widget

neotw-cmp widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class AutoCompleteWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const titlePlugin = require('./plugins/title');
    const { closeCmp, openCmp } = require('./plugins/utils');

    const createElement = $tw.utils.domMaker;
    const domNode = document.createElement('div');

    // 注册事件
    $tw.rootWidget.addEventListener('open-cmp', () => openCmp(domNode));

    const aut = require('./autocomplete');

    // dark:invert
    const layout = createElement('div', {
      class:
        'z-[9999] bg-white transform shadow-lg py-2 fixed left-1/2 top-24 -translate-x-1/2 w-2/3 rounded transition-all w-3/4 md:w-1/2',
    });

    const app = createElement('div', {
      attributes: {
        id: 'neotw-cmp',
      },
    });

    layout.appendChild(app);

    aut.autocomplete({
      container: app,
      placeholder: 'Search ...',
      autoFocus: true,
      openOnFocus: true,
      debug: false,
      plugins: [titlePlugin(domNode)],
      ignoreCompositionEvents: true, // IME friendly
      defaultActiveItemId: 0,
    });

    const masklayer = createElement('div', {
      class:
        'opacity-0 backdrop-blur-lg z-[9998] fixed inset-0 bg-black/20 transition-all cursor-pointer opacity-100',
    });
    masklayer.title = '点击关闭搜索面板';

    domNode.append(masklayer, layout);

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);

    closeCmp(domNode);
    masklayer.addEventListener('click', () => {
      closeCmp(domNode);
    });
  }
}

/** @description neotw-cmp widget */
exports['neotw-cmp'] = AutoCompleteWidget;
