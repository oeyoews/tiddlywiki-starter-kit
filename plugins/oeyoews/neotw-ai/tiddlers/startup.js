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
const recommendTagHook = require('./recommendTag');

exports.startup = function () {
  $tw.rootWidget.addEventListener('th-renaming-tiddler-ai', (event) => {
    renameTiddlerTitle(event.tiddlerTitle);
  });
  $tw.rootWidget.addEventListener('th-recommendTag', (event) => {
    recommendTagHook(event.tiddlerTitle);
  });
};
