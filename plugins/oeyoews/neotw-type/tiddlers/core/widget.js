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

      const neotwString = 'The quick brown fox jumps over the lazy dog';
      const text = this.getAttribute('text', neotwString);
      const loop = this.getAttribute('loop', false);
      const gradient = this.getAttribute('gradient');
      const divNode = $tw.utils.domMaker('div', {
        text,
        class: 'inline',
        attributes: {},
      });
      const classNames =
        // 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-pink-500 to-yellow-500';
        'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 inline';
      if (gradient) {
        classNames.split(' ').forEach((className) => {
          divNode.classList.add(className);
        });
      }
      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);

      new Typed(this.domNodes[0], {
        strings: [text],
        cursorChar: ' 🐳',
        typeSpeed: 150,
        loop: loop,
        fadeOut: true,
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: 500,
        shuffle: true,
      });
    }
  }

  exports.typing = TypedWidget;
})();
