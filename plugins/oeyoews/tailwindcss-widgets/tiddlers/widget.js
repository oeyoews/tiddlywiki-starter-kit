/*\
title: $:/plugins/oeyoews/tailwindcss-widgets/widget.js
type: application/javascript
module-type: widget

tailwindcss-widgets widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class TailwindcssTextWidget extends Widget {
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

    const domNode = createElement('span', {});

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description tailwindcss-widgets widget */
exports['tw-text'] = TailwindcssTextWidget;
