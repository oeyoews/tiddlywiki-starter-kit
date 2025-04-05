/*\
title: $:/plugins/oeyoews/neotw/macros/random-words.js
type: application/javascript
module-type: macro

random words
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'random-words';

  exports.params = [];

  // support get tiddler text with filter
  const randomWords = [
    'Tiddlywiki 名字可真长',
    '我真喜欢 Tiddlywiki, 这个是真爱',
    '最后一个笔记软件是 Tiddlywiki',
    '真后悔没有早点看到 Tiddlywiki',
    '还好没有错过 Tiddlywiki',
    'Tiddlywiki 并没有什么用户体验(UI)',
    '官方的插件系统看起来遥遥无期了',
    'Tiddlywiki 有很多好的东西',
    'Tiddlywiki 确实很小众',
    '我用 Tiddlywiki 作为笔记软件',
    '我用 Tiddlywiki 写了很多(vue)插件',
    'Tiddlywiki 是个很好的笔记软件',
    '我通过 Tiddlywiki 通过了很多插件',
  ];

  exports.run = function () {
    const word = randomWords[Math.floor(Math.random() * randomWords.length)];
    return `<div class="random-words text-sm  bg-gradient-to-r inline-block from-cyan-400 via-green-400 to-lime-500 text-transparent bg-clip-text">${word}</div>`;
  };
})();
