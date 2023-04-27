/*\
title: windicss/startup.js
type: application/javascript
module-type: startup

windicss

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'windicss-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    window.windicssRuntimeOptions = {
      // enabled preflight
      preflight: false,
      // scan the entire dom tree to infer the classnames on page loaded
      extractInitial: true,
      // generate mock classes for browser to do the auto-completeion
      mockClasses: false,
      // the windi config you are used to put in `windi.config.js`
      config: {},
    };
    require('$:/plugins/oeyoews/tiddlywiki-windicss/windicss.min.js');
  };
})();
