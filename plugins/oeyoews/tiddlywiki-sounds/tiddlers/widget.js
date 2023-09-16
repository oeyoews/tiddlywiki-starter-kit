/*\
title: $:/plugins/oeyoews/tiddlywiki-sounds/widget.js
type: application/javascript
module-type: widget

sounds widget

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

      let count = 0;
      const className = this.getAttribute('className');
      const widgetId = this.getAttribute('id');

      const icon = $tw.wiki.getTiddlerText(
        '$:/plugins/oeyoews/tiddlywiki-sounds/icon',
      );
      const buttonNode = this.document.createElement('button');
      buttonNode.id = widgetId;
      buttonNode.innerHTML = icon;
      buttonNode.className = className;

      buttonNode.onclick = () => {
        count++;
        howler();
        buttonNode.innerHTML = `${icon} (${count})`;
      };

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }
  }

  exports.soundPlay = HowlWidget;
})();
