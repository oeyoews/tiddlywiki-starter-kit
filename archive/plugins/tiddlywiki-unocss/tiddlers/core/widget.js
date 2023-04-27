/*\
title: $:/plugins/oeyoews/tiddlywiki-unocss/widget.js
type: application/javascript
module-type: widget

tiddlywiki-unocss widget

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) {
    return;
  }

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

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
      divNode.id = 'divId';
      divNode.textContent = param;
      divNode.className = 'divClass';
      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);
    }

    refresh() {
      var changedAttributes = this.computeAttributes();
      // changedAttributes.title;
      if (Object.keys(changedAttributes).length > 0) {
        this.refreshSelf();
        return true;
      } else {
        return false;
      }
    }
  }

  exports['div-widget'] = DivWidget;
})();
