/*\
title: $:/plugins/myplugin/confetti-widget.js
type: application/javascript
// module-type: widget
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  // Load the startConfetti function from the confetti library
  const startConfetti =
    require('$:/plugins/myplugin/confetti.js').startConfetti;

  // Define the confetti widget
  class ConfettiWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.addEventListeners([
        { type: 'click', handler: this.handleClick.bind(this) },
      ]);
    }

    handleClick(event) {
      startConfetti();
    }
  }

  // Export the ConfettiWidget class
  exports['confetti-widget'] = ConfettiWidget;
})();
