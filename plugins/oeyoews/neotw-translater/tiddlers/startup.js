/*\
title: translater/startup.js
type: application/javascript
module-type: startup

translater module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'translater-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    window.Translater = require('translater.min.js');
    new Translater({
      lang: 'en',
    });
  };
})();
