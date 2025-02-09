/*\
title: iconify/startup.js
type: application/javascript
module-type: startup

iconify module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'iconify-startup';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    require('$:/plugins/oeyoews/neotw-icons/iconify.min.js');
  };
})();
