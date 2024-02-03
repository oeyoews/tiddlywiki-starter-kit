/*\
title: $:/plugins/oeyoews/tiddlywiki-prettier/widget.js
type: application/javascript
module-type: widget

tiddlywiki-prettier widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class PrettierWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.prettier = null;
    this.plugins = null;
    this.formatedText = '';
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    const format = require('./format');

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    const btn = createElement('button', {
      text: 'format'
    });

    btn.addEventListener('click', async () => {
      this.formatedText = await format('* 测试，', 'markdown');
      console.log(this.formatedText);
    });

    const domNode = createElement('div', {
      children: [btn]
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description tiddlywiki-prettier widget */
exports['prettier'] = PrettierWidget;
