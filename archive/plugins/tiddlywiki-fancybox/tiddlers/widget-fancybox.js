/*\
title: fancybox/widget
type: application/javascript
module-type: widget

fancybox widget
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

      const src = this.getAttribute('src', '');
      const alt = this.getAttribute('alt', '');
      const width = this.getAttribute('width', '256');

      const imgNode = $tw.utils.domMaker('img', {
        class: '',
        attributes: {
          src,
          alt,
          width,
          'data-fancybox': this.getVariable('currentTiddler'),
          'data-caption': alt,
        },
      });

      parent.insertBefore(imgNode, nextSibling);
      this.domNodes.push(imgNode);
    }
  }

  exports['fbox'] = FancyboxWidget;
})();
