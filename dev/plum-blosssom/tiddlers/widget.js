/*\
title: $:/plugins/oeyoews/plum-blosssom/widget.js
type: application/javascript
module-type: widget

plum-blosssom widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class PlumWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    const ssr = parent.isTiddlyWikiFakeDom;
    if (ssr) return;

    this.computeAttributes();
    this.execute();

    const canvas = document.createElement('canvas');

    const plum = require('./plum');
    plum(canvas);

    parent.insertBefore(canvas, nextSibling);
    this.domNodes.push(canvas);
  }
}

/**
 * @description plum-blosssom widget
 */
exports.plum = PlumWidget;
