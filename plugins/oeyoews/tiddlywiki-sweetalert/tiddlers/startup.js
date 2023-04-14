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

  exports.name = 'fancybox-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;

  exports.startup = function () {
    // cookie, indexedDB
    const swal = require('$:/plugins/oeyoews/sweetalert/sweetalert.min.js');
    if (window.location.protocol === 'https:') {
      // if (!window.location.href.includes('https://neotw.oeyoewl.top')) {
      // 获取存储的日期
      const storedDate = localStorage.getItem('notificationDate');

      // 获取当前日期
      const currentDate = new Date().toDateString();

      // 如果存储的日期与当前日期不同，则触发通知
      if (storedDate !== currentDate) {
        // 设置存储的日期为当前日期
        localStorage.setItem('notificationDate', currentDate);

        swal('Welcome to neotw', '', 'success');
      }
    }
  };
})();
