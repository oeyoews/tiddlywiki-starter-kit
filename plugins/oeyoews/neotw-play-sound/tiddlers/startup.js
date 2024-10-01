/*\
title: $:/plugins/oeyoews/neotw-play-sound/startup.js
type: application/javascript
module-type: startup

play sound
\*/

// https://stackoverflow.com/questions/17762763/play-wav-sound-file-encoded-in-base64-with-javascript

function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function (...args) {
    const context = this;
    const callNow = immediate && !timer;

    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    }, delay);

    if (callNow) {
      fn.apply(context, args);
    }
  };
}

let currentAudio = null;
function playSound(event) {
  const pluginTitle = '$:/plugins/oeyoews/neotw-play-sound/';
  const { audioTiddler } = event.paramObject || {
    audioTiddler: pluginTitle + 'menu-open.mp3',
  };

  const soundBase64 = $tw.wiki.getTiddlerText(audioTiddler);

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = new Audio('data:audio/mp3;base64,' + soundBase64);
  currentAudio.play();
}

const debouncePlaySound = debounce(playSound, 200, true);

exports.startup = function () {
  $tw.rootWidget.addEventListener('neotw-play-sound', (event) => {
    debouncePlaySound(event);
  });
};
