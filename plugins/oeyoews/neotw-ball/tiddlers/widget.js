/*\
title: $:/plugins/oeyoews/neotw-ball/widget.js
type: application/javascript
module-type: widget

neotw-ball widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class BallWidget extends Widget {
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
    const addEvent = require('./addEvent');

    const domNode = createElement('div', {
      class: 'drag-ball',
    });
    domNode.innerHTML = $tw.wiki.renderTiddler('text/html', '$:/core/icon', {
      parseAsInline: true,
    });

    addEvent(domNode);

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description neotw-ball widget */
exports['ball'] = BallWidget;
