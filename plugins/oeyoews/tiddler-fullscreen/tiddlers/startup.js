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
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      /*       const statetiddlers = $tw.wiki.filterTiddlers(
        `[prefix[$:/state/tiddler-fullscreen/]text[yes]]`
      );
      statetiddlers.forEach((tiddler) => $tw.wiki.deleteTiddler(tiddler)); */
      $tw.wiki.deleteTiddler('$:/state/tiddler-fullscreen/fullscreen');
    }
  });
};
