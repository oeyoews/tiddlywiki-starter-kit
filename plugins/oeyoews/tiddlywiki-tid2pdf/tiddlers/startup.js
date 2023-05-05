/*\
title: tid2pdf/startup.js
type: application/javascript
module-type: startup

tid2pdf module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'tid2pdf-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    window.jspdf = require('jspdf.umd.min.js');
    window.html2canvas = require('html2canvas.min.js');
  };
})();
