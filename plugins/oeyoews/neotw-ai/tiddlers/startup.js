/*\
title: $:/plugins/oeyoews/neotw-ai/startup.js
type: application/javascript
module-type: startup

\*/

exports.platforms = ['browser'];
exports.synchronous = true;
exports.after = ['startup'];
exports.name = 'neotw-ai-startup-hook';

const renameTiddlerTitle = require('./rename-hook');

exports.startup = function () {
  $tw.rootWidget.addEventListener('th-renaming-tiddler-ai', (event) => {
    renameTiddlerTitle(event.tiddlerTitle);
  });
};
