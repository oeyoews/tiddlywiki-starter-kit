/*\
title: $:/plugins/oeyoews/tiddler-fullscreen/action.js
type: application/javascript
module-type: library

\*/
module.exports = function toggleElementFullscreen(title) {
  const prefix = '$:/state/tiddler-fullscreen/';
  try {
    const target = document.querySelector(`[data-tiddler-title="${title}"]`);
    if (document.fullscreenElement !== target) {
      target.requestFullscreen();
      $tw.wiki.setText(prefix + title, 'text', '', 'yes');
    } else if (document.fullscreenElement === target) {
      document.exitFullscreen();
      // NOTE: 如果使用esc 退出， 不会更新这个状态
      $tw.wiki.setText(prefix + title, 'text', '', 'no');
    }
  } catch (e) {
    console.warn(e);
  }
};
