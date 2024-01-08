/*\
title: $:/plugins/oeyoews/tiddlywiki-cmp-emoji/widget.js
type: application/javascript
module-type: widget

tiddlywiki-cmp-emoji widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class ExampleWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    const btn = createElement('button', {
      text: 'click me',
      class: 'rounded p-1'
    });

    const domNode = createElement('div', {
      text: 'example',
      class: 'underline font-bold',
      children: [btn]
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description tiddlywiki-cmp-emoji widget
 * @param xxx
 */
exports.test = ExampleWidget;
