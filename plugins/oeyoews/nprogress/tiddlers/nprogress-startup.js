/*\
title: nprogress-startup.js
type: application/javascript
module-type: startup

nprogress module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'nprogress-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    try {
      window.NProgress = require('nprogress.min.js');
      NProgress.start();
      const startTime = performance.now();
      window.onload = function () {
        NProgress.done();
        const endTime = performance.now();
        const loadTime = Math.floor(endTime - startTime);
        console.log(`🎉 Page loaded in ${loadTime}ms`);
      };
    } catch (e) {}
  };
})();
