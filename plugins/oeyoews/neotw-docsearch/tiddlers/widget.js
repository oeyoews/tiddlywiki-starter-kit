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

  class DocsearchWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const appId = this.getAttribute('appId', 'J3KXNDI6EY');
      const apiKey = this.getAttribute(
        'apiKey',
        'd5a043d7612fcecb99fb85cbdce1653f',
      );
      const indexName = this.getAttribute('indexName', 'neotw-oeyoewl');
      const container = this.getAttribute('container', '#searchbox');
      const placeholder = this.getAttribute('placeholder', 'Search neotw');

      const divNode = this.document.createElement('div');
      divNode.id = 'searchbox';

      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);

      docsearch({
        appId,
        apiKey,
        indexName,
        container,
        placeholder,
      });
    }
  }

  exports.docsearch = DocsearchWidget;
})();
