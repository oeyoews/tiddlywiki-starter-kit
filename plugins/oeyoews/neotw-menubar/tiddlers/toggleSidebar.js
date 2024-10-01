/*\
title: $:/plugins/oeyoews/neotw-menubar/toggleSidebar.js
type: application/javascript
module-type: library

\*/
module.exports = () => {
  const opt = {
    suppressTimestamp: true,
  };
  // 触发切换侧边栏声音
  $tw.rootWidget.dispatchEvent({
    type: 'neotw-play-sound',
    // paramObject: {
    //   audioTiddler: '$:/plugins/oeyoews/neotw-play-sound/sounds/pop.mp3',
    // },
  });
  if ($tw.wiki.getTiddlerText(`$:/state/notebook-sidebar`) == 'yes') {
    $tw.wiki.setText(`$:/state/notebook-sidebar`, 'text', null, 'no', opt);
  } else {
    $tw.wiki.setText(`$:/state/notebook-sidebar`, 'text', null, 'yes', opt);
  }
};
