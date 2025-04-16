/*\
title: $:/plugins/oeyoews/neotw-menubar/toggleSidebar.js
type: application/javascript
module-type: library

\*/
module.exports = () => {
  const opt = {
    suppressTimestamp: true,
  };
  let sound = '$:/plugins/oeyoews/neotw-play-sound/menu-open.mp3';
  if ($tw.wiki.getTiddlerText(`$:/state/notebook-sidebar`) == 'yes') {
    $tw.wiki.setText(`$:/state/notebook-sidebar`, 'text', null, 'no', opt);
  } else {
    $tw.wiki.setText(`$:/state/notebook-sidebar`, 'text', null, 'yes', opt);
    sound = '$:/plugins/oeyoews/neotw-play-sound/sounds/water.mp3';
  }
  $tw.rootWidget.dispatchEvent({
    type: 'neotw-play-sound',
    paramObject: {
      audioTiddler: sound,
    },
  });
};
