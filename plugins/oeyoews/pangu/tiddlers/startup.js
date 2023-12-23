/*\
title: $:/plugins/oeyoews/pangu/startup.js
type: application/javascript
module-type: startup

\*/

exports.name = 'pangu-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const format = require('./format.js');
  $tw.rootWidget.addEventListener('om-format-tiddler', (event) => {
    format(event.tiddlerTitle);
  });
};
