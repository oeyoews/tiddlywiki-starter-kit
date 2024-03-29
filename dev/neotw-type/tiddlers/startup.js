/*\
title: type/startup.js
type: application/javascript
// module-type: startup

type module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'type-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    window.Typed = require('typed.min.js');
  };
})();
