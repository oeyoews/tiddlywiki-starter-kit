/*\
title: meting/startup.js
type: application/javascript
module-type: startup

meting
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'meting-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;

  exports.startup = function () {
    require('$:/plugins/oeyoews/neotw-music/meting.min.js');
  };
})();
