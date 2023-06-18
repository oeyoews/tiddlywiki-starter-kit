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

      const loop = this.getAttribute('loop', false);
      const divNode = $tw.utils.domMaker('div', {
        text,
        class: 'inline',
        attributes: {},
      });
      const gradient = this.getAttribute('gradient', true);
      if (gradient) {
        divNode.classList.add(
          'text-transparent',
          'bg-clip-text',
          'bg-gradient-to-r',
          /* 'from-teal-400',
          'via-pink-500',
          'to-yellow-500', */
          'from-cyan-400',
          'to-purple-400',
        );
      }
      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);

      new Typed(this.domNodes[0], {
        strings: [text],
        cursorChar: ' 🐳',
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
