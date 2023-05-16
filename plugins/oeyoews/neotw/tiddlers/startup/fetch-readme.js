/*\
title: fetch-readme/startup.js
type: application/javascript
module-type: startup

fetch-readme module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'fetch-readme-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = async () => {
    // https
    if (window.location.protocol === 'http:') return;
    const url =
      'https://raw.githubusercontent.com/oeyoews/neotw/main/README.md';
    const response = await fetch(url);
    const text = await response.text();
    const fileName = '$:/plugins/oeyoews/neotw/README';
    $tw.wiki.setText(fileName, 'text', null, text);
    $tw.wiki.setText(fileName, 'type', null, 'text/markdown');
  };
})();
