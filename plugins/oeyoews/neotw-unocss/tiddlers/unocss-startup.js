/*\
title: unocss-startup.js
type: application/javascript
module-type: startup

unocss-startup
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'unocss-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    require('unocss.min.js');
  };
})();