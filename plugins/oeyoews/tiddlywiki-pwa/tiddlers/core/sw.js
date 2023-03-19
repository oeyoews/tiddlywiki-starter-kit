/*\
title: sw.js
type: application/javascript
module-type: library

sw.js

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) {
    return;
  }
  function mime() {
    // 设置 MIME 类型
    self.addEventListener('fetch', function (event) {
      event.respondWith(
        fetch(event.request)
          .then(function (response) {
            return response;
          })
          .catch(function () {
            return new Response(null, {
              status: 200,
              headers: { 'Content-Type': 'text/javascript' },
            });
          }),
      );
    });
  }
  mime();

  // 定义缓存名称和需要缓存的文件列表
  var CACHE_NAME = 'my-cache';
  var urlsToCache = ['/', '/favicon.ico'];

  // 安装 Service Worker
  self.addEventListener('install', function (event) {
    console.log('Service Worker 安装成功');
    event.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        console.log('缓存文件：', urlsToCache);
        return cache.addAll(urlsToCache);
      }),
    );
  });

  // 拦截网络请求
  self.addEventListener('fetch', function (event) {
    console.log('拦截到网络请求：', event.request.url);
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          console.log('从缓存中返回：', event.request.url);
          return response;
        } else {
          console.log('从网络中获取：', event.request.url);
          return fetch(event.request).catch(function () {
            console.log('获取失败，返回离线页面');
            return caches.match('/');
          });
        }
      }),
    );
  });
})();
