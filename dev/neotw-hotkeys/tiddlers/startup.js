/*\
title: hotkeys/startup.js
type: application/javascript
module-type: startup

hotkeys module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'hotkeys-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    window.hotkeys = require('hotkeys.min.js');
    hotkeys('ctrl+b+a,r,f', function (event, handler) {
      switch (handler.key) {
        case 'ctrl+b+a':
          alert('you pressed ctrl+a!');
          break;
        default:
          alert(event);
      }
    });
  };
})();
