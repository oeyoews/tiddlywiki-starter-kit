/*\
title: $:/plugins/oeyoews/neotw-login/widget.js
type: application/javascript
module-type: widget

neotw-login widget

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

      const loginPage = require('./loginPage');
      loginPage();

      parent.insertBefore(loginPage, nextSibling);
      this.domNodes.push(loginPage);
    }
  }

  exports[''] = DivWidget;
})();
