/*\
title: $:/plugins/oeyoews/neotw-play-sound/startup.js
type: application/javascript
module-type: startup

play sound
\*/

// https://stackoverflow.com/questions/17762763/play-wav-sound-file-encoded-in-base64-with-javascript
exports.startup = function () {
  const pluginTitle = '$:/plugins/oeyoews/neotw-play-sound';
  $tw.rootWidget.addEventListener('neotw-play-sound', (event) => {
    const { audioTiddler } = event.paramObject || {
      audioTiddler: pluginTitle + '/menu-open.mp3',
    };
    const soundBase64 = $tw.wiki.getTiddlerText(audioTiddler);
    const sound = new Audio('data:audio/mp3;base64,' + soundBase64);
    sound.play();
  });
};
