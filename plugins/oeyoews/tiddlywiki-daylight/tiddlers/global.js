/*\
title: system-mode.js
type: application/javascript
// module-type: global

system-mode
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const isDarkMode = () => {
    if (!$tw.browser) return;
    require('daylight.js');
    window.toggle = require('toggle.js').toggle;
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  };

  isDarkMode();
  console.log(`is`);

  exports.toggleMode = isDarkMode;
})();
