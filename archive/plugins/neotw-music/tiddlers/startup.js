/*\
title: $:/plugins/oeyoews/neotw-music/startup.js
type: application/javascript
module-type: startup

neotw music startup

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'music-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;

  exports.startup = function () {
    // global music window.APlayer is key
    window.APlayer = require('$:/plugins/oeyoews/neotw-music/aplayer.min.js');
    // metingjs
    require('$:/plugins/oeyoews/neotw-music/meting.min.js');
    // add html tag
    const {
      metingOption,
    } = require('$:/plugins/oeyoews/neotw-music/meting-init.js');
    metingOption();
  };
})();
