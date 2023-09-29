/*\
title: $:/plugins/oeyoews/neotw-info/widget.js
type: application/javascript
module-type: widget

neotw-info widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
  const createContainer = require('./info');

  class InfoWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const domNode = createContainer();

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    }
  }

  /**
   * @description neotw-info widget
   */
  exports.oinfo = InfoWidget;
})();
