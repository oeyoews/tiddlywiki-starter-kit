/*\
title: $:/plugins/oeyoews/tiddler-fullscreen/action.js
type: application/javascript
module-type: library

\*/
module.exports = function toggleElementFullscreen(title) {
  const stateTiddler = '$:/state/tiddler-fullscreen/fullscreen';
  try {
    const target = document.querySelector(
      `[data-tiddler-title="${CSS.escape(title)}"]`
    );
    if (document.fullscreenElement !== target) {
      target.requestFullscreen();
      $tw.wiki.setText(stateTiddler, 'text', '', 'yes');
    } else if (document.fullscreenElement === target) {
      document.exitFullscreen();
      // $tw.wiki.setText(prefix + title, 'text', '', 'no');
    }
  } catch (e) {
    console.warn(e);
  }
};
