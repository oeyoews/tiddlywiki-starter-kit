/*\
title: $:/plugins/oeyoews/tiddlywiki-prettier/startup.js
type: application/javascript
module-type: startup

\*/

exports.name = 'prettier-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const formatTiddler = require('./formatTiddler');
  $tw.rootWidget.addEventListener('om-prettier-tiddler', (event) => {
    const title =
      event.navigateFromTitle ||
      event?.paramObject?.title ||
      event.tiddlerTitle;
    console.log(event);
    formatTiddler(title);
  });
};
