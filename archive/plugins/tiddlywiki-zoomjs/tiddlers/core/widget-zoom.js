/*\
title: $:/plugins/oeyoews/tiddlywiki-zoom/widget-zoom.js
type: application/javascript
module-type: widget

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

  // Load the zoom.js library
  const zoom =
    require('$:/plugins/oeyoews/tiddlywiki-zoom/library/zoom.js').zoom;

  class ZoomWidget extends Widget {
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

      // Add a click event listener to the image node
      imgNode.addEventListener('click', this.handleClick.bind(this));

      parent.insertBefore(imgNode, nextSibling);
      this.domNodes.push(imgNode);
    }

    refresh(changedTiddlers) {
      const changedAttributes = this.computeAttributes();
      if (
        changedAttributes.src || // Change this to match the attribute name for the image source
        changedAttributes.width ||
        changedAttributes.height ||
        changedAttributes.alt || // Change this to match the attribute name for the image alt text
        changedTiddlers[this.getAttribute('src')] // Change this to match the attribute name for the image source
      ) {
        this.refreshSelf();
        return true;
      } else {
        return false;
      }
    }

    handleClick(event) {
      event.preventDefault();
      // zoom(event.target, {});
    }
  }

  exports.zoom = ZoomWidget;
})();
