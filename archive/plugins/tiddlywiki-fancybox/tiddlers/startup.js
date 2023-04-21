/*\
title: fancybox/startup.js
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
  exports.after = ['load-modules'];
  exports.synchronous = true;

  exports.startup = function () {
    require('$:/plugins/oeyoews/tiddlywiki-fancybox/jq.min.js');
    require('$:/plugins/oeyoews/tiddlywiki-fancybox/fancybox.min.js');
  };
})();
