/*\
title: $:/plugins/oeyoews/tiddler-fullscreen/action.js
type: application/javascript
module-type: library

\*/
module.exports = function toggleElementFullscreen(title) {
  try {
    const target = document.querySelector(`[data-tiddler-title="${title}"]`);
    target.requestFullscreen();
    if (document.fullscreenElement === null) {
    } else if (document.fullscreenElement === target) {
      document.exitFullscreen();
    }
  } catch (e) {
    console.warn(e);
  }
};
