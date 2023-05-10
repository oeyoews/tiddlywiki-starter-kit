/*\
title: echarts/startup.js
type: application/javascript
// module-type: startup

echarts module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'echarts-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    window.echarts = require('echarts.min.js');
  };
})();
