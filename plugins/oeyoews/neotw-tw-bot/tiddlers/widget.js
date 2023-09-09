/*\
title: $:/plugins/oeyoews/neotw-tw-bot/widget.js
type: application/javascript
module-type: widget

neotw-tw-bot widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';
  // 是$:/plugins/oeyoews/neotw-tw-bot/sendmessage.js 的简写, 和真实文件路径无关, 但最好相同, 方便编辑器识别, 就不用写.js 后缀
  const twBot = require('./sendmessage');

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class TwBot extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.virtualRoot = null;
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;
      this.virtualRoot = twBot();

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      parent.insertBefore(this.virtualRoot, nextSibling);
      this.domNodes.push(this.virtualRoot);
    }

    refresh() {
      this.refreshSelf();
    }
  }

  exports['tw-bot'] = TwBot;
})();
