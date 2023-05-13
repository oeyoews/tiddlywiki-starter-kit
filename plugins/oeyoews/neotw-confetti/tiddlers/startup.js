/*\
title: $:/plugins/oeyoews/neotw-confetti/startup.js
type: application/javascript
module-type: startup

load confetti

\*/
(function() {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'confetti-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;

  exports.startup = function() {
    // <$button>
    // <$action-sendmessage $message="om-confetti-launch" type="centerSound" />
    $tw.rootWidget.addEventListener('om-confetti-launch', event => {
      try {
        const paramObject = event.paramObject || {};
        const type = paramObject.type || 'center';
        // const sound = paramObject.sound || '';
        Confetti[type]();
      } catch { }
    });
    // startup first first

    window.Confetti = require('$:/plugins/oeyoews/neotw-confetti/example/fireworks.js');
    // use landing instead
    // Confetti.fireworks();
  };
})();
