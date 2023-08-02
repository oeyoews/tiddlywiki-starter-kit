/*\
title: $:/plugins/oeyoews/neotw-counter/widget.js
type: application/javascript
module-type: widget

neotw-counter widget

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

    async render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const getCounter = require('./getCounter.js');
      let counter = await getCounter();

      const counterNode = document.createElement('div');
      counterNode.textContent = counter;
      parent.insertBefore(counterNode, nextSibling);
      this.domNodes.push(counterNode);
    }
  }

  exports['counter'] = DivWidget;
})();
