/*\
title: $:/plugins/oeyoews/tiddlywiki-fancybox-ui/startup.js
type: application/javascript
module-type: startup

fancybox
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'fancybox-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    const init = require('./init');
    const addDataFancy = require('./addDataFancy');

    init();
    $tw.rootWidget.addEventListener('om-fancybox', () => {
      addDataFancy();
    });
  };
})();
