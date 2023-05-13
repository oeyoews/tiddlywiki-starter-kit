/*\
title: $:/plugins/oeyoews/neotw-type/widget-hitokoto.js
type: application/javascript
module-type: widget

neotw-type widget with hitokoto

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

      const sentences = $tw.wiki.getTiddlerData(
        '$:/plugins/oeyoews/neotw-hitokoto/sentences.json',
      );
      const randomIndex = Math.floor(Math.random() * sentences.length);
      const text =
        sentences[randomIndex].hitokoto + ' ' + sentences[randomIndex].from;

      // not worked
      const loop = this.getAttribute('loop', 'false');
      const gradient = this.getAttribute('gradient', 'true');
      const spanNode = this.document.createElement('span');
      const time = new Date().getTime();
      const id = 'neotwTyping-' + time;
      spanNode.id = id;
      spanNode.textContent = text;
      if (gradient === 'true') {
        spanNode.className =
          'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-pink-500 to-yellow-500 cursor-pointer';
      }
      parent.insertBefore(spanNode, nextSibling);
      this.domNodes.push(spanNode);

      new Typed(`#${id}`, {
        strings: [text],
        cursorChar: ' 🐬',
        typeSpeed: 100,
        loop: loop,
        fadeOut: true,
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: 500,
        shuffle: true,
      });
    }
  }

  exports['typing-hitokoto'] = TypedWidget;
})();
