/*\
title: $:/plugins/oeyoews/tiddlywiki-notify/widget.js
type: application/javascript
module-type: widget

notify widget

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class HowlWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const status = this.getAttribute('status');
      const title = this.getAttribute('title');
      const text = this.getAttribute('text');
      const autoclose = this.getAttribute('autoclose');

      const param = this.getAttribute('param', 'Click');
      const className = this.getAttribute('className');
      const widgetId = this.getAttribute('id');

      const buttonNode = this.document.createElement('button');
      buttonNode.id = widgetId;
      buttonNode.textContent = param;
      buttonNode.className = className;

      buttonNode.onclick = () => {
        pushNotify(status, title, text, autoclose);
      };

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }
  }

  exports.notify = HowlWidget;
})();
