/*\
title: $:/plugins/oeyoews/neotw-docsearch/widget.js
type: application/javascript
module-type: widget

neotw-docsearch widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const docsearch = require('docsearch.min.js');

  class DivWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const param = this.getAttribute('param', 'Test Param');

      const divNode = this.document.createElement('div');
      divNode.id = 'searchbox';
      divNode.textContent = param;
      divNode.className = 'divClass';
      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);
      docsearch({
        appId: 'J3KXNDI6EY',
        apiKey: 'd5a043d7612fcecb99fb85cbdce1653f',
        indexName: 'neotw',
        container: '#searchbox',
        debut: true,
      });
    }
  }

  exports['docsearch'] = DivWidget;
})();
