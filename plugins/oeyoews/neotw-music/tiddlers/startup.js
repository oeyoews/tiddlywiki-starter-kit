/*\
title: $:/plugins/oeyoews/neotw-music/startup.js
type: application/javascript
module-type: startup

neotw music

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
    require('$:/plugins/oeyoews/neotw-music/meting-init.js');
  };
})();
