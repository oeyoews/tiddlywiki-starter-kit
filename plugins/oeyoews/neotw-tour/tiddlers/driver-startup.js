/*\
title: dirver-startup.js
type: application/javascript
module-type: startup

 module

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'driver-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    require('./driver.min.js');
    const driver = window.driver.js.driver;
    window.driverObj = driver();
  };
})();