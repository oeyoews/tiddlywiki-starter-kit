/*\
title: $:/plugins/oeyoews/tiddlywiki-sweetalert/startup.js
type: application/javascript
module-type: startup

swealalert

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'swal-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;

  exports.startup = function () {
    require('$:/plugins/oeyoews/tiddlywiki-sweetalert/startup-message.js');

    // TODO add params
    // https://github.com/Jermolene/TiddlyWiki5/compare/master...confetti-plugin
    $tw.rootWidget.addEventListener('om-swal', event => {
      try {
        swal(event.detail.message);
      } catch (err) {
        console.log(err);
      }
    });
  };
})();
