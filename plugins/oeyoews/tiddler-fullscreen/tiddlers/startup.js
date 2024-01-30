/*\
title: $:/plugins/oeyoews/tiddler-fullscreen/startup.js
type: application/javascript
module-type: startup

\*/

exports.name = 'fullscreen-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const action = require('./action');
  $tw.rootWidget.addEventListener('om-tiddler-fullscreen', (event) => {
    action(event?.paramObject?.title || event.tiddlerTitle);
  });
};
