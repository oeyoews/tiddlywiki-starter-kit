/*\
title: $:/plugins/oeyoews/translate/startup.js
type: application/javascript
module-type: startup

translate startup

\*/

exports.name = 'translate-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const translate = require('./translate');

  $tw.rootWidget.addEventListener('om-translate-tiddler', (event) =>
    translate(event.tiddlerTitle)
  );
};
