/*\
title: $:/plugins/oeyoews/neotw-confetti/confetti-widget.js
type: application/javascript
module-type: widget
\*/

// TODO: support action to clik event
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const fireworks =
    require('$:/plugins/oeyoews/neotw-confetti/example/fireworks.js').fireworks;
  const snow =
    require('$:/plugins/oeyoews/neotw-confetti/example/snow.js').snow;
  const vanilla =
    require('$:/plugins/oeyoews/neotw-confetti/example/vanilla.js').frame;
  const msg =
    require('$:/plugins/oeyoews/neotw-confetti/example/right-msg.js').msg;

  class ConfettiButtonWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();
      const text = this.getAttribute('text', 'Click Me!');
      // Create a new button element
      const button = this.document.createElement('button');
      button.textContent = text;

      // Bind the handleClick function to the button's click event
      button.addEventListener('click', this.handleClick.bind(this));

      // Insert the button into the DOM
      parent.insertBefore(button, nextSibling);

      this.domNodes.push(button);
    }

    handleClick(event) {
      const type = this.getAttribute('type', 'fireworks');
      switch (type) {
        case 'fireworks':
          fireworks();
          break;
        // not work now
        case 'snow':
          snow();
          break;
        case 'vanilla':
          vanilla();
          break;
        case 'msg':
          msg();
          break;
        default:
          fireworks();
      }
    }
  }

  exports['confetti'] = ConfettiButtonWidget;
})();
