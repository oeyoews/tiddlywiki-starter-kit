/*\
title: $:/plugins/oeyoews/tiddlywiki-tailwindcss-plus/startup.js
type: application/javascript
module-type: startup
hide-body: yes

tailwindcss startup

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'tailwindcss-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    tailwind = require('tailwindcss.min.js');
    var tailwindConfig = require('tailwind.config.js');
    tailwind.config = tailwindConfig;
  };
})();
