/*\
title: $:/plugins/oeyoews/tiddlywiki-medium-zoom/startup.js
type: application/javascript
module-type: startup

zoomjs

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'medium-zoomjs-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    window.mediumZoom = require('medium-zoom.min.js');
    mediumZoom('[data-zoom]');
    $tw.rootWidget.addEventListener('om-zoom', () => {
      mediumZoom('[data-zoom]');
    });
  };
})();
