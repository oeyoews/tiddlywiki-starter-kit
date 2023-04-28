/*\
title: $:/plugins/oeyoews/tiddlywiki-notify/startup.js
type: application/javascript
module-type: startup

simple notify

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'notify-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    // not suppor require umd
    // window.Notify = require('simple-notify.min.js');
    window.pushNotify = (
      status = 'success',
      title = 'Notify',
      text = 'Text',
      effect = 'slide',
      autoclose = false,
    ) =>
      new Notify({
        status,
        title,
        text,
        effect,
        speed: 300,
        autoclose,
        customClass: null,
        customIcon: null,
        showIcon: true,
        showCloseButton: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'right top',
      });
  };
})();
