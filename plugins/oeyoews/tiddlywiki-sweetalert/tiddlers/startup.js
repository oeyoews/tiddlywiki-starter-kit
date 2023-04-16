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

  exports.name = 'neotw-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;

  exports.startup = function () {
    const swal = require('$:/plugins/oeyoews/sweetalert/sweetalert.min.js');
    const neotw = JSON.parse(localStorage.getItem('neotw')) || {};
    const currentDate = new Date().toDateString();
    const noNotifyDate = neotw.noNotifyDate;

    if (window.location.protocol === 'https:' && noNotifyDate !== currentDate) {
      swal({
        title: '👋 Welcome to neotw !',
        text: '',
        icon: 'success',
        buttons: {
          no: {
            text: 'Silent',
            value: false,
          },
          yes: {
            text: 'Close',
            value: true,
            visible: true,
          },
        },
      }).then(result => {
        if (!result) {
          neotw.noNotifyDate = currentDate;
          localStorage.setItem('neotw', JSON.stringify(neotw));
        }
      });
    }
  };
})();
