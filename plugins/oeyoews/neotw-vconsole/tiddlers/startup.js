/*\
title: $:/plugins/oeyoews/neotw-vconsole/startup.js
type: application/javascript
module-type: startup

\*/
exports.name = 'vconsole-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const configTiddler = '$:/plugins/oeyoews/neotw-vconsole/config';
  const enableVConsole = $tw.wiki.getTiddlerText(configTiddler) === 'yes';
  if (!enableVConsole) {
    return;
  }
  const vconsole = require('./vconsole.min.js');
  const vConsole = new vconsole();
  window.vConsole = vConsole;
  console.info('Loaded vConsole');
};
