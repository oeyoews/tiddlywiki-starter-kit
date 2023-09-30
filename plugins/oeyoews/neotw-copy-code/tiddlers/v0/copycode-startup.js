/*\
title: $:/plugins/oeyoews/neotw-copy-code/copycode-startup.js
type: application/javascript
// module-type: startup

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
    const addCopyButton = require('$:/plugins/oeyoews/neotw-copy-code/add-copybutton.js');
    $tw.rootWidget.addEventListener('om-copy-code', addCopyButton);
  };
})();
