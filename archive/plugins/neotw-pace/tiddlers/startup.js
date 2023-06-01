/*\
title: pace/startup.js
type: application/javascript
module-type: startup

pace module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'pace-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    window.pace = require('pace.min.js');
  };
})();
