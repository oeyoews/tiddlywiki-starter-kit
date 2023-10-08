/*\
title: $:/plugins/oeyoews/tiddlywiki-tailwindcss-plus/startup.js
type: application/javascript
module-type: startup

tailwindcss init
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'tailwindcss-startup-hook';
  exports.platforms = ['browser'];
  exports.before = ['render'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    window.tailwind = require('tailwindcss.min.js');
    tailwind.config = require('./tailwind.config');
  };
})();
