/*\
title: $:/plugins/oeyoews/neotw-fetch/startup.js
type: application/javascript
module-type: startup

fetch-readme module
\*/
exports.name = 'fetch-readme-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;

exports.startup = () => {
  const { addfile } = require('./addfile');

  const readmeURL =
    'https://raw.githubusercontent.com/oeyoews/neotw/main/README.md';

  $tw.rootWidget.addEventListener('om-fetch', (event) => {
    const time = new Date().getTime();
    const {
      paramObject: { url = readmeURL, fileName = `fetch-${time}` } = {},
    } = event;
    addfile(url, fileName);
  });
};
