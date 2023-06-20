/*\
title: $:/plugins/oeyoews/neotw-manifest/startup.js
type: application/javascript
module-type: startup

neotw-manifest startup

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'manifest-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    const { Manifest } = require('manifest.js');
    Manifest();
    console.log('🎉 Manifest');
  };
})();
