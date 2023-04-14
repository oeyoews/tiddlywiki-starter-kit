/*\
title: $:/plugins/oeyoews/tiddlywiki-fancybox-ui/startup.js
type: application/javascript
module-type: startup

fqncybox
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
    const {
      Fancybox,
    } = require('$:/plugins/oeyoews/tiddlywiki-fancybox/library/fancybox.min.js');
    const options = require('$:/plugins/oeyoews/tiddlywiki-fancybox/fancybox.options.js');
    Fancybox.defaults = {
      ...Fancybox.defaults,
      ...options,
    };
    Fancybox.bind('[data-fancybox]', {
      wheel: 'close', // pan slide soom false
      startIndex: '0', // not work
      hideScrollbar: true,
    });
  };
})();
