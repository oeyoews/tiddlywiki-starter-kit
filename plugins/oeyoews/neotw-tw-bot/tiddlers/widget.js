/*\
title: $:/plugins/oeyoews/neotw-tw-bot/widget.js
type: application/javascript
module-type: widget

neotw-tw-bot widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";
  // 是$:/plugins/oeyoews/neotw-tw-bot/sendmessage.js 的简写, 和真实文件路径无关, 但最好相同, 方便编辑器识别, 就不用写.js 后缀
  const twBot = require("./sendmessage");

  const Widget = require("$:/core/modules/widgets/widget.js").widget;

  class TwBot extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;
      const virtualRoot = twBot();

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      parent.insertBefore(virtualRoot, nextSibling);
      this.domNodes.push(virtualRoot);
    }
  }

  exports["tw-bot"] = TwBot;
})();
