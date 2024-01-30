/*\
title: $:/plugins/oeyoews/tiddler-fullscreen/action.js
type: application/javascript
module-type: library

\*/
module.exports = function toggleElementFullscreen(title) {
  if (document.fullscreenElement === null) {
    const target = document.querySelector(`[data-tiddler-title="${title}"]`);
    target.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
