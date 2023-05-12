/*\
title: $:/plugins/oeyoews/neotw-type/widget.js
type: application/javascript
module-type: widget

neotw-type widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const Typed = require('typed.min.js');

  class TypedWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const neotwString =
        'A modern style and elegant notebook based on Tiddlywiki by oeyoews';
      const text = this.getAttribute('text');
      const spanNode = this.document.createElement('span');
      spanNode.id = 'neotwTyping';
      spanNode.textContent = text || neotwString;
      spanNode.className =
        'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-pink-500 to-yellow-500 cursor-pointer';
      parent.insertBefore(spanNode, nextSibling);
      this.domNodes.push(spanNode);

      new Typed('#neotwTyping', {
        strings: [neotwString],
        cursorChar: ' 🐬',
        typeSpeed: 150,
        loop: true,
        fadeOut: true,
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: 500,
        shuffle: true,
      });
    }
  }

  exports.typing = TypedWidget;
})();
