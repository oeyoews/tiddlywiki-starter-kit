/*\
title: notranslate/startup.js
type: application/javascript
module-type: startup

notranslate module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'notranslate-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = () => {
    document.body.classList.add('notranslate');
  };
})();
