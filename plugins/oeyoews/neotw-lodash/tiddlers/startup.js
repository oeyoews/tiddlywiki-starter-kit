/*\
title: lodash/startup.js
type: application/javascript
module-type: startup

lodash module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'lodash-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    window._ = require('lodash.min.js');
  };
})();
