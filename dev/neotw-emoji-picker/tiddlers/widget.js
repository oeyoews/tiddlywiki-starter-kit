/*\
title: $:/plugins/oeyoews/neotw-emoji-picker/widget.js
type: application/javascript
module-type: widget

neotw-emoji-picker widget

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class EmojiPickerWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const emojiComponent = require('./emoji-picker');
      const root = emojiComponent();
      parent.insertBefore(root, nextSibling);
      this.domNodes.push(root);
    }
  }

  exports['emoji-picker'] = EmojiPickerWidget;
})();
