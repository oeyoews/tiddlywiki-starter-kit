/*\
title: $:/plugins/oeyoews/neotw-music/startup.js
type: application/javascript
module-type: startup

meting
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'music-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;

  exports.startup = function () {
    // aplayer
    window.APlayer = require('$:/plugins/oeyoews/neotw-music/aplayer.min.js');
    // meting
    require('$:/plugins/oeyoews/neotw-music/meting.min.js');
    // load options
    require('$:/plugins/oeyoews/neotw-music/meting-init.js');
  };
})();
