/*\
title: $:/plugins/oeyoews/tiddlywiki-sounds/startup.js
type: application/javascript
module-type: startup

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'howl-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;

  exports.startup = function () {
    const Howl = require('howler.min.js').Howl;
    window.howler = function (param = 'menu-open.mp3') {
      // TODO add pagecontrol button to toggle sound, and support dynamic buttons
      // if () return
      // TODO
      new Howl({
        src: [
          '/files/' + param,
          'https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/plugins/oeyoews/tiddlywiki-sounds/files/sounds/menu-open.mp3',
          // 'click.mp3',
        ],
        format: ['mp3'],
        autoplay: true,
        volume: 0.5,
        html5: true,
        /* onend: function () {
          console.log('Finished!');
        }, */
      }).play();
    };

    $tw.rootWidget.addEventListener('om-sound', (event) => {
      const paramObject = event.paramObject || {};
      const sound = paramObject.sound || 'menu-open.mp3';
      howler(sound);
    });
  };
})();
