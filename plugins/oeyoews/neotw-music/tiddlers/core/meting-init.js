/*\
title: $:/plugins/oeyoews/neotw-music/meting-init.js
type: application/javascript
module-type: library

meting-init

\*/

(function () {
  window.APlayer = require('$:/plugins/oeyoews/neotw-music/aplayer.min.js');
  require('$:/plugins/oeyoews/neotw-music/meting.min.js');

  const { fields = {} } =
    $tw.wiki.getTiddler('$:/plugins/oeyoews/neotw-music/config') || {};

  var metingjs = document.createElement('meting-js');
  // if (!fields.id) {
  //   console.warn('检测到你没有设置 TWM id, 默认使用 2916766519');
  // }

  const options = [
    'server',
    'id',
    'type',
    'order',
    'loop',
    'preload',
    'mutex',
    'fixed',
    'list-folded',
  ];

  options.forEach(option => {
    metingjs.setAttribute(option, fields[option]);
  });

  // 修复BUG：判断 enablelrc 属性是否为 'no'，如果是则将 'lrc-type' 属性设置为 'yes'
  if (fields.enablelrc === 'no') {
    metingjs.setAttribute('lrc-type', 'yes');
  }

  document.body.appendChild(metingjs);
  // console.log(`🎶 当前歌单为 ${fields.server} && ${fields.id}`);
})();
