/*\
title: $:/plugins/oeyoews/neotw-image-card/widget.js
type: application/javascript
module-type: widget

neotw-image-card widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class NeotwImageCardWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const createElement = $tw.utils.domMaker;

    const btn = createElement('button', {
      text: 'Click me',
      class: 'rounded p-1',
    });

    const domNode = createElement('div', {
      // text: 'example',
      // class: 'underline font-bold',
      children: [btn],
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description neotw-image-card widget */
exports['widget-2kci4ftq'] = NeotwImageCardWidget;
