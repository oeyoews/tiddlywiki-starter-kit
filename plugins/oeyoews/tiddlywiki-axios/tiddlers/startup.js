/*\
title: axios/startup.js
type: application/javascript
module-type: startup

axios module

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'axios-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    window.axios = require('axios.min.js');
  };
})();
