/*\
title: react/startup.js
type: application/javascript
module-type: startup

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'react-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;

  exports.startup = function () {
    window.React = require('test.min.js');
    window.ReactDOM = require('test-dom.min.js');
    /* require('react.production.min.js');
    require('react-dom.production.min.js'); */
  };
})();
