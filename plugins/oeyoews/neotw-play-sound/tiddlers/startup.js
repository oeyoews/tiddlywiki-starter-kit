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
  const { audioTiddler } = event?.paramObject || {
    audioTiddler: pluginTitle + 'menu-open.mp3',
  };

  const soundBase64 = $tw.wiki.getTiddlerText(audioTiddler);

  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = new Audio('data:audio/mp3;base64,' + soundBase64);
    currentAudio.play();
  } catch (e) {
    console.error(e);
  }
}

const debouncePlaySound = debounce(playSound, 200, true);

exports.platforms = ['browser'];
exports.synchronous = true;
exports.after = ['startup'];

exports.startup = function () {
  $tw.rootWidget.addEventListener('neotw-play-sound', (event) => {
    debouncePlaySound(event);
  });

  const configTiddlerName = '$:/config/eyoews/neotw-play-sound/config';
  const hooks = $tw.wiki.getTiddler(configTiddlerName).fields;
  const enableHooks = [];

  Object.entries(hooks).forEach((hook) => {
    if (hook[0].startsWith('t') && hook[1] === 'yes') {
      enableHooks.push(hook[0]);
    }
  });

  const sound = {
    default: '$:/plugins/oeyoews/neotw-play-sound/sounds/pop.mp3',
    'th-closing-tiddler':
      '$:/plugins/oeyoews/neotw-play-sound/sounds/switch-on.mp3',
  };
  enableHooks.forEach((hook) => {
    // !为了性能，修改配置后需要重启, 不在这里每次重新检测值的变化
    const enableSound =
      $tw.wiki.getTiddler(configTiddlerName).fields[hook] === 'yes';
    if (!enableSound) {
      return;
    }
    $tw.hooks.addHook(hook, function (event) {
      playSound({
        paramObject: {
          audioTiddler: sound[hook] || sound.default,
        },
      });
      $tw.hooks.invokeHook('neotw-play-sound', event);
      return event;
    });
  });
};
