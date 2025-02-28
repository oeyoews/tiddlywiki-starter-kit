/*\
title: $:/plugins/oeyoews/neotw-reading-time/reading-time-full.js
type: application/javascript
module-type: macro

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  function getTextTotal(text) {
    // 统计中文字符数量（汉字、标点等）
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;

    // 统计英文单词数量（按空格分隔）
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;

    // 计算总字数
    const totalWords = chineseChars + englishWords;
    return totalWords || 0;
  }

  exports.name = 'reading-time-full'; // book image header

  exports.params = [
    {
      name: 'filter',
    },
  ];

  exports.run = function (_filter) {
    const filter = '[!is[system]!is[binary]!type[application/json]]';
    const tiddlers = $tw.wiki.filterTiddlers(_filter || filter);
    if (!tiddlers) return 0;
    let wordsTotal = 0;

    tiddlers.forEach((tiddler) => {
      if (!$tw.wiki.tiddlerExists(tiddler)) return;
      const text = $tw.wiki.getTiddler(tiddler).fields?.text;
      if (text) {
        wordsTotal += getTextTotal(text);
      }
    });
    return wordsTotal.toLocaleString();
  };
})();
