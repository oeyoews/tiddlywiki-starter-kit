/*\
title: $:/plugins/oeyoews/tiddlywiki-settings/widget.js
type: application/javascript
module-type: widget

tiddlywiki-settings widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class ExampleWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    const settings = require('./setting');

    const btn = createElement('button', {
      text: 'Click me',
      class: 'rounded p-1'
    });

    const domNode = createElement('div', {
      // text: 'example',
      // class: 'underline font-bold',
      children: [btn]
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description tiddlywiki-settings widget */
exports['widget-3DU11czCzY'] = ExampleWidget;
