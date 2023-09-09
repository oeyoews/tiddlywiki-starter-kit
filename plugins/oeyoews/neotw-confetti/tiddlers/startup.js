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
  exports.after = ['startup'];
  exports.synchronous = true;

  exports.startup = function () {
    require('$:/plugins/oeyoews/neotw-confetti/library/confetti.min.js');
    const Confetti = require('$:/plugins/oeyoews/neotw-confetti/example/fireworks.js');
    $tw.rootWidget.addEventListener('om-confetti-launch', (event) => {
      // paramObject 通过actionsendmessage 作用传递,不同于param
      const type = event.paramObject?.type || 'center';
      // const sound = paramObject.sound || '';
      // canot use &&
      confetti?.reset();
      Confetti[type]?.();
    });
  };
})();
