/*\
title: $:/plugins/oeyoews/neotw-ppt/slide-md-widget.js
type: application/javascript
module-type: widget

neotw-ppt widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const { assignDataset } = require('./utils');

class SlideMDWidget extends Widget {
  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    let slideNode = this.document.createElement('SECTION');
    const textAreaNode = this.document.createElement('textarea');
    textAreaNode.setAttribute('data-template', true);
    slideNode.appendChild(textAreaNode);
    assignDataset(slideNode.dataset, this.attributes);
    slideNode.setAttribute('data-markdown', true);
    this.renderChildren(textAreaNode);
    parent.insertBefore(slideNode, nextSibling);
    this.domNodes.push(slideNode);
  }
}

exports['slide-md'] = SlideMDWidget;
