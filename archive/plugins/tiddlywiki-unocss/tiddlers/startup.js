/*\
title: unocss/startup.js
type: application/javascript
module-type: startup

\*/

(function() {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'unocss-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    require('$:/plugins/oeyoews/tiddlywiki-unocss/unocss.min.js');
    /* window.__unocss = {
      rules: [
      ],
      presets: [
      ],
    }; */
  };
})();
