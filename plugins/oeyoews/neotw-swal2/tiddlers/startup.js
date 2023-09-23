/*\
type: application/javascript
title: $:/plugins/oeyoews/neotw-swal2/startup.js
module-type: startup

swal2 module
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'swal2-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    window.Swal = require('$:/plugins/oeyoews/neotw-swal2/swal2.min.js');
    /* window.location.protocol === 'https:' &&
      require('$:/plugins/oeyoews/neotw-swal2/startup-message-swal.js'); */
  };
})();
