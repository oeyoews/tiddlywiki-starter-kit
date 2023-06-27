/*\
title: $:/plugins/oeyoews/neotw-pangu/startup.js
type: application/javascript
module-type: startup

pangu module

\*/
(function() {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'pangu-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    window.pangu = require('./pangu.min.js');
  };
})();