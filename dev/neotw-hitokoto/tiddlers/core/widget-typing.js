/*\
title: $:/plugins/oeyoews/neotw-hitokoto/widget-typing.js
type: application/javascript
// module-type: widget

Hitokoto typing widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class Hitokoto extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.executing = false;
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const Typed = require('typed.min.js');
      const hitokotoNode = this.document.createElement('div');
      hitokotoNode.textContent = 'Loading...';
      hitokotoNode.classList.add(
        'text-transparent',
        'bg-clip-text',
        'bg-gradient-to-r',
        'from-teal-400',
        'via-pink-500',
        'to-yellow-500',
        'cursor-pointer',
        'text-xs',
        'line-clamp-1',
        'my-4',
        'inline',
      );
      parent.insertBefore(hitokotoNode, nextSibling);
      this.domNodes.push(hitokotoNode);

      const fetchHitokoto = () => {
        fetch('https://v1.hitokoto.cn')
          .then((response) => response.json())
          .then((data) => {
            const hitokotoText = data.hitokoto;
            const hitokotoFrom = '@' + data.from;
            hitokotoNode.textContent = `${hitokotoText} ${hitokotoFrom}`;
          })
          .catch(console.error)
          .finally(() => {
            this.executing = false;
          });
      };

      const _ = require('lodash.min.js');
      const throttleHitokotoHandleClick = _.throttle(
        fetchHitokoto.bind(this),
        1000,
      );

      hitokotoNode.addEventListener('click', () => {
        throttleHitokotoHandleClick();
      });
      fetchHitokoto();

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

  exports.hitokotoDev = Hitokoto;
})();
