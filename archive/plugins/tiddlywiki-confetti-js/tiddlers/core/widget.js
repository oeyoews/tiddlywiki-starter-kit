/*\
title: $:/plugins/oeyoews/confetti/confetti-widget.js
type: application/javascript
module-type: widget
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) {
    return;
  }

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const ConfettiGenerator = require('$:/plugins/oeyoews/tiddlywiki-confetti/library/confetti.min.js');

  class ConfettiWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      // Create a new canvas element
      const canvas = this.document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      canvas.width = this.getAttribute('width', '640');
      canvas.height = this.getAttribute('height', '480');

      // Insert the canvas into the DOM
      parent.insertBefore(canvas, nextSibling);

      // Create a new button element
      const button = this.document.createElement('button');
      button.textContent = this.getAttribute('text', 'Click Me!');

      // Bind the handleClick function to the button's click event
      button.addEventListener('click', this.handleClick.bind(this));

      // Insert the button into the DOM
      parent.insertBefore(button, nextSibling);

      this.domNodes.push(canvas, button);
    }

    handleClick(event) {
      const canvas = document.getElementById('confetti-canvas');
      const duration = parseInt(this.getAttribute('duration', '3000'), 10);
      const confettiOptions = {
        angle: parseInt(this.getAttribute('angle', '90'), 10),
        spread: parseInt(this.getAttribute('spread', '45'), 10),
        startVelocity: parseInt(this.getAttribute('velocity', '45'), 10),
        elementCount: parseInt(this.getAttribute('count', '50'), 10),
        dragFriction: parseFloat(this.getAttribute('friction', '0.1')),
        colors: this.getAttribute(
          'colors',
          '#f44336,#e91e63,#9c27b0,#673ab7,#3f51b5,#2196f3,#03a9f4,#00bcd4,#009688,#4caf50,#8bc34a,#cddc39,#ffeb3b,#ffc107,#ff9800,#ff5722',
        ).split(','),
        shapes: ['circle', 'square', 'triangle'],
        scalar: 1,
      };
      const confettiInstance = new ConfettiGenerator(canvas, confettiOptions);
      confettiInstance({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => confettiInstance.reset(), duration);
    }
  }

  exports.confettijs = ConfettiWidget;
})();
