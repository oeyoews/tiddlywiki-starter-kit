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
    // 从 localStorage 中读取数据
    const neotw = JSON.parse(localStorage.getItem('neotw')) || {
      lastNotified: null,
    };
    // 获取存储的日期
    const storedDate = neotw.lastNotified;
    // 获取当前日期
    const currentDate = new Date().toDateString();

    // 如果协议不是 HTTPS，并且上次通知的日期与当前日期不同，则触发通知
    if (window.location.protocol !== 'https:' && storedDate !== currentDate) {
      // 更新存储的日期为当前日期
      neotw.lastNotified = currentDate;
      // 存储更新后的 JavaScript 对象
      localStorage.setItem('neotw', JSON.stringify(neotw));
      // 触发通知
      swal('👋 Welcome to neotw !', '', 'success');
    }
  };
})();
