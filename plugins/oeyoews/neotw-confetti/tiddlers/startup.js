/*\
title: $:/plugins/oeyoews/neotw-confetti/startup.js
type: application/javascript
module-type: startup

load confetti

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'confetti-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;

  exports.startup = function () {
    // load some confetti effects
    window.Confetti = require('$:/plugins/oeyoews/neotw-confetti/example/fireworks.js');
    // startup trigger fireworks
    // Confetti.fireworks();
  };
})();
