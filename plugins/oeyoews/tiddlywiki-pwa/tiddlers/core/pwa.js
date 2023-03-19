/*\
title: general-widget
type: application/javascript
module-type: global

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) {
    return;
  }

  function pwa() {
    // 注册 Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('sw.js')
        .then(function (registration) {
          console.log('Service Worker 注册成功：', registration.scope);
        })
        .catch(function (error) {
          console.log('Service Worker 注册失败：', error);
        });
    }
    console.log('🚀 xxxxx');
  }
  pwa();
})();
