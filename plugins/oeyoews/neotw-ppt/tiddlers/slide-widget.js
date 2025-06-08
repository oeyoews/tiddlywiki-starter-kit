/*\
title: $:/plugins/oeyoews/neotw-ppt/slide-widget.js
type: application/javascript
module-type: widget

neotw-ppt widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const { assignDataset } = require('./utils');

class SlideWidget extends Widget {
  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    let slideNode = this.document.createElement('SECTION');
    assignDataset(slideNode.dataset, this.attributes);
    this.renderChildren(slideNode);
    parent.insertBefore(slideNode, nextSibling);
    this.domNodes.push(slideNode);
  }
}

exports.slide = SlideWidget;
