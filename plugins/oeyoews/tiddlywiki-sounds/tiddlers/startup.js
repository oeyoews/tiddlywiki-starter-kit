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
  exports.after = ['load-modules'];
  exports.synchronous = true;

  exports.startup = function () {
    const Howl = require('howler.min.js').Howl;
    window.howler = function (param = 'menu-open.mp3') {
      new Howl({
        src: [
          '/files/' + param,
          'https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/plugins/oeyoews/tiddlywiki-sounds/files/sounds/menu-open.mp3',
        ],
        /* onend: function () {
          console.log('Finished!');
        }, */
      }).play();
    };
  };
})();
