/*\
title: $:/plugins/oeyoews/autocorrect-wrapper/startup.js
type: application/javascript
module-type: startup

autocorrect-wrapper startup

\*/

exports.name = 'autocorrect-wrapper-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;

exports.startup = () => {
  if (!window.electronAPI) return;
  const action = require('./action');
  $tw.rootWidget.addEventListener('om-tiddler-format', (event) => {
    action(event?.paramObject?.title || event.tiddlerTitle);
  });
};
