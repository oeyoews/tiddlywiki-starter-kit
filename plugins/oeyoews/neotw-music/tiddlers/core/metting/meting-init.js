/*\
title: $:/plugins/oeyoews/neotw-music/js/meting-init.js
type: application/javascript

meting-init
\*/
(function () {
  var twmTiddler = '$:/plugins/oeyoews/neotw-music/config';
  var twmTiddlerGet = $tw.wiki.getTiddler(twmTiddler);
  var config = twmTiddlerGet ? twmTiddlerGet.fields : {};
  var metingjs = document.createElement('meting-js');
  if (!config.id) {
    console.warn('检测到你没有设置TWM id, 默认使用 2916766519');
  }

  const options = [
    'server',
    'id',
    'type',
    'order',
    'loop',
    'preload',
    'mutex',
    'fixed',
    'list-olded',
  ];

  options.forEach(option => {
    metingjs.setAttribute(option, config[option]);
  });

  // BUG
  if (config.enablelrc === 'no') {
    metingjs.setAttribute('lrc-type', 'yes');
  }
  document.body.appendChild(metingjs);
  console.log(`🎶 当前歌单为 ${config.server} && ${config.id} `);
})();
