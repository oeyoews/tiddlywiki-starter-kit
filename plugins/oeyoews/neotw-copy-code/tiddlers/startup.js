/*\
title: copyButton/startup.js
type: application/javascript
module-type: startup

copyButton module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'copyButton-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    const {
      addCopyButton,
    } = require('$:/plugins/oeyoews/neotw-copy-code/copyCode.js');
    // window.copyButton = addCopyButton;
    $tw.rootWidget.addEventListener('om-copy-code', () => {
      addCopyButton();
      Swal.fire({
        title: `Enable copy code`,
        icon: 'success',
        toast: true,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
        position: 'top-end',
      });
    });
  };
})();
