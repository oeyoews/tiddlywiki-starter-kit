/*\
title: $:/plugins/oeyoews/neotw-cli-info/widget.js
type: application/javascript
module-type: widget

neotw-cli-info widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DivWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const buttonNode = document.createElement('div');

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }
  }

  /**
   * @description neotw-cli-info widget
   * @param xxx
   */
  exports.test = DivWidget;
})();
