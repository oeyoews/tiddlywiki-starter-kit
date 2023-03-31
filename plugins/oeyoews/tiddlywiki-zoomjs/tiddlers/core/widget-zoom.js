/*\
title: $:/plugins/oeyoews/tiddlywiki-zoom/widget-zoom.js
type: application/javascript
// module-type: widget

zoom
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) {
    return;
  }

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class FancyboxWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const src = this.getAttribute('src');
      const alt = this.getAttribute('alt', '');
      const width = this.getAttribute('width', '256');

      const imgNode = this.document.createElement('img');

      imgNode.src = src;
      imgNode.alt = alt;
      imgNode.width = width;
      imgNode.setAttribute('data-action', 'zoom');
      parent.insertBefore(imgNode, nextSibling);
      this.domNodes.push(imgNode);
    }
  }

  exports['zoom'] = FancyboxWidget;
})();
