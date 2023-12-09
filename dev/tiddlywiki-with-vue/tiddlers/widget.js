/*\
title: $:/plugins/oeyoews/tiddlywiki-with-vue/widget.js
type: application/javascript
// module-type: widget

tiddlywiki-with-vue widget

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
    const vue = require('vue.global.js');

    const btn = createElement('button', {
      text: 'click me',
      class: 'rounded p-1',
    });

    const domNode = createElement('div', {
      text: 'example',
      class: 'underline font-bold',
      children: [btn],
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description tiddlywiki-with-vue widget
 * @param xxx
 */
exports.test = ExampleWidget;
