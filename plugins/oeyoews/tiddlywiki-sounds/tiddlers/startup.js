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
    window.playSound = function (filepath = 'click.mp3') {
      new Howl({
        src: [filepath],
      }).play();

      console.log(`${filepath}`);
    };
  };
})();
