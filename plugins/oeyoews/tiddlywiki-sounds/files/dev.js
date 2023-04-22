(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'howl-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;

  exports.startup = function (param) {
    // 定义默认参数
    const defaultParams = {
      filename: 'menu-open.mp3',
      format: 'mp3',
    };
    // 合并参数
    const params = Object.assign({}, defaultParams, param);

    const Howl = require('howler.min.js').Howl;
    window.howler = function () {
      new Howl({
        src: [
          { url: '/files/' + params.filename, format: params.format },
          {
            url:
              'https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/plugins/oeyoews/tiddlywiki-sounds/files/sounds/' +
              params.filename,
            format: params.format,
          },
        ],
      }).play();
    };
  };
})();
