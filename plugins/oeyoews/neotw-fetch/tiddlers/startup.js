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
  exports.synchronous = false;
  exports.startup = async () => {
    $tw.rootWidget.addEventListener('om-fetch-mdfile', async (event) => {
      const paramObject = event.paramObject || {};
      const time = new Date().getTime();
      const fileName = paramObject.fileName || `fetch-${time}`;
      const url =
        paramObject.url ||
        'https://raw.githubusercontent.com/oeyoews/neotw/main/README.md';
      const response = await fetch(url);
      const text = await response.text();
      $tw.wiki.setText(fileName, 'text', null, text);
      $tw.wiki.setText(fileName, 'type', null, 'text/markdown');
    });

    // if (window.location.protocol === 'http:') return;
    const url =
      'https://cdn.jsdelivr.net/gh/oeyoews/tiddlywiki-starter-kit@main/README.md';
    const response = await fetch(url);
    const text = await response.text();
    const fileName = '$:/plugins/oeyoews/neotw/README';
    $tw.wiki.setText(fileName, 'text', null, text);
    $tw.wiki.setText(fileName, 'type', null, 'text/markdown');
  };
})();
