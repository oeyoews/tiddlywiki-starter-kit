/*\
title: fetch/startup.js
type: application/javascript
module-type: startup

fetch-readme module

\*/
// TODO: add changelog
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'fetch-readme-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;

  // jsdelivr.com 有缓存, 所以有时候readme 不是最新的, 使用@latest也会限制, 如果直接使用 raw GitHub readme, 会有请求速率限制
  exports.startup = async () => {
    const readmeURL =
      'https://raw.githubusercontent.com/oeyoews/neotw/main/README.md';
    $tw.rootWidget.addEventListener('om-fetch-mdfile', async (event) => {
      const paramObject = event.paramObject || {};
      const time = new Date().getTime();
      const fileName = paramObject.fileName || `fetch-${time}`;
      const url = paramObject.url || readmeURL;
      const response = await fetch(url);
      const text = await response.text();
      $tw.wiki.setText(fileName, 'text', null, text);
      $tw.wiki.setText(fileName, 'type', null, 'text/markdown');
    });

    // if (window.location.protocol === 'http:') return;
    const response = await fetch(readmeURL);
    const text = await response.text();
    const fileName = '$:/plugins/oeyoews/neotw/README';
    $tw.wiki.setText(fileName, 'text', null, text);
    $tw.wiki.setText(fileName, 'type', null, 'text/markdown');
  };
})();
