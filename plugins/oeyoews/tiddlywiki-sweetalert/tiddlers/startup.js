/*\
title: $:/plugins/oeyoews/tiddlywiki-sweetalert/startup.js
type: application/javascript
module-type: startup

swealalert

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'fancybox-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;

  exports.startup = function () {
    const swal = require('$:/plugins/oeyoews/sweetalert/sweetalert.min.js');
  };
})();
