/*\
title: $:/plugins/oeyoews/neotw-confetti/confetti-widget.js
type: application/javascript
module-type: widget
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

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
        class:
          'bg-indigo-300 rounded-sm m-1 hover:bg-indigo-400 duration-300 transition',
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
      require('$:/plugins/oeyoews/neotw-confetti/library/confetti.min.js');
      confetti?.reset();
      const Confetti = require('$:/plugins/oeyoews/neotw-confetti/example/fireworks.js');
      const type = this.getAttribute('type');

      if (type === 'random' || !type) {
        const types = Object.keys(Confetti);
        const randomType = types[Math.floor(Math.random() * types.length)];
        confetti.reset();
        Confetti[randomType]();
      } else {
        type && Confetti[type]?.();
      }
    }

    /* handleClick() {
      const Confetti = require('$:/plugins/oeyoews/neotw-confetti/example/fireworks.js');
      const type = this.getAttribute('type');
      type && Confetti[type]?.();
    } */
  }

  exports.confetti = ConfettiButtonWidget;
})();
