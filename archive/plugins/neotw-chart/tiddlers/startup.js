/*\
title: chart/startup.js
type: application/javascript
// module-type: startup

chart module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'chart-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    window.Chart = require('chart.min.js');
  };
})();
