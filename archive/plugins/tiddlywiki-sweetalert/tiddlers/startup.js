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
  exports.after = ['startup'];
  exports.synchronous = true;

  exports.startup = function () {
    window.swal = require('$:/plugins/oeyoews/sweetalert/sweetalert.min.js');

    /* if (window.location.protocol === 'https:') {
      require('$:/plugins/oeyoews/tiddlywiki-sweetalert/startup-message.js');
    } */

    // https://github.com/Jermolene/TiddlyWiki5/compare/master...confetti-plugin
    $tw.rootWidget.addEventListener('om-swal', event => {
      const paramObject = event.paramObject || {};
      const icon = paramObject.icon || 'success';
      const title = paramObject.title || 'Title';
      const text = paramObject.text || 'Sweet Alert';
      swal({ icon, title, text });
    });
  };
})();
