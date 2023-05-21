/*\
title: $:/plugins/oeyoews/neotw-translater/widget.js
type: application/javascript
module-type: widget

neotw-translater widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DivWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const Translater = require('translater.js');
      const tran = new Translater({
        lang: 'en',
      });
      const param = this.getAttribute('param', 'Test Param');

      const divNode = this.document.createElement('div');
      divNode.id = 'divId';
      divNode.textContent = param;
      divNode.className = 'divClass';
      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);
    }
  }

  exports['translater'] = DivWidget;
})();
