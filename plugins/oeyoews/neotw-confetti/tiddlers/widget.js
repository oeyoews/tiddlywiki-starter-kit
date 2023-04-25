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
      const button = this.document.createElement('button');
      button.textContent = text;
      button.addEventListener('click', this.handleClick.bind(this));

      parent.insertBefore(button, nextSibling);

      this.domNodes.push(button);
    }

    handleClick() {
      const type = this.getAttribute('type', 'fireworks');
      try {
        Confetti[type]();
      } catch {
        console.warn(`${type} is not supported params `);
      }
    }
  }

  exports.confetti = ConfettiButtonWidget;
})();
