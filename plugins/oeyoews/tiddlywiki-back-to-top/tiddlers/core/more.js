/*\
title: $:/plugins/oeyoews/tiddlywiki-back-top-top/more.js
type: application/javascript
// module-type: startup

more

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  // Export name and synchronous status
  exports.name = 'more';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;

  exports.startup = moreListener;
})();
