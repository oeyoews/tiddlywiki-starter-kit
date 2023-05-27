/*\
title: $:/plugins/oeyoews/neotw-confetti/confetti-widget.js
type: application/javascript
module-type: widget
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class ConfettiButtonWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const text = this.getAttribute('text', 'Click Me!');
      const buttonNode = $tw.utils.domMaker('button', {
        text,
        class: 'bg-red-200 rounded m-1',
        eventListeners: [
          {
            name: 'click',
            handlerObject: this,
            handlerMethod: 'handleClick',
          },
        ],
      });

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }

    handleClick() {
      const confettiMethods = Object.values(Confetti);
      const type = this.getAttribute('type');

      // how use reset method
      function randomConfetti() {
        const index = Math.floor(Math.random() * confettiMethods.length);
        if (method && typeof method === 'function') {
          confettiMethods[index];
        }
      }

      try {
        if (type) {
          Confetti[type]();
        } else {
          randomConfetti();
        }
      } catch {
        console.warn(`${type} is not supported params `);
      }
    }
  }

  exports.confetti = ConfettiButtonWidget;
})();
