/*\
title: $:/plugins/oeyoews/tiddlywiki-tid2png/startup.js
type: application/javascript
module-type: startup

tid2pdf module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'tid2png-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    const exportPng = require('./export-png.js');
    $tw.rootWidget.addEventListener('om-export-png', (event) => {
      exportPng(event);
    });
  };
})();
