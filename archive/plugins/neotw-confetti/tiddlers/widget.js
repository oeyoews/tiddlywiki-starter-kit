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
  const {
    fireworks,
    snow,
    pride,
    realistic,
    random,
    center,
    msg,
  } = require('$:/plugins/oeyoews/neotw-confetti/example/fireworks.js');

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
      const confettiMap = {
        fireworks,
        snow,
        pride,
        realistic,
        random,
        center,
        msg,
      };
      const confettiFunc = confettiMap[type] || fireworks;
      confettiFunc();
    }
  }

  exports['confetti'] = ConfettiButtonWidget;
})();
