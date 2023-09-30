/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/startup.js
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
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    const { checkModeListener, toggleMode } = require('./daylight-listener');
    checkModeListener();
    $tw.rootWidget.addEventListener('om-toggle-theme', toggleMode);
  };
})();
