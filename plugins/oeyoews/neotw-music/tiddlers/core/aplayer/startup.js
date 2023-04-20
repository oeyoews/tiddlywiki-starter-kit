/*\
title: $:/plugins/oeyoews/neotw-music/aplayer-startup.js
type: application/javascript
module-type: startup

load aplayer
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'aplayer-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;

  exports.startup = function () {
    window.APlayer = require('$:/plugins/oeyoews/neotw-music/aplayer.min.js');
  };
})();
