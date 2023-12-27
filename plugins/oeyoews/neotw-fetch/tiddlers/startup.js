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
  $tw.rootWidget.addEventListener('om-fetch', async (event) => {
    const time = new Date().getTime();
    const {
      paramObject: {
        url = 'https://raw.githubusercontent.com/oeyoews/neotw/main/README.md',
        fileName = `fetch-${time}`
      } = {}
    } = event;
    await addfile(url, fileName);
  });
};
