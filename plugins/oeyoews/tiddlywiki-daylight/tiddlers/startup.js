/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/daylight/startup.js
type: application/javascript
module-type: startup

daylight module

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'daylight-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    require('daylight.js');
    window.toggle = require('toggle.js').toggle;
    window.setTheme = require('toggle.js').setTheme;
    $tw.rootWidget.addEventListener('om-toggle-theme', () => {
      toggle();
    });
  };
})();
