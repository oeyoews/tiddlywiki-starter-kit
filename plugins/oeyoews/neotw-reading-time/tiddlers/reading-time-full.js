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
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
    return chineseChars + englishWords || 0;
  }

  exports.name = 'reading-time-full';

  exports.params = [
    {
      name: 'filter',
    },
  ];

  exports.run = function (_filter) {
    const filter =
      '[!is[system]!is[binary]!type[application/json]!publish[private]has[text]]';
    const tiddlers = $tw.wiki.filterTiddlers(_filter || filter);
    if (!tiddlers || tiddlers.length === 0) return '0';

    let topTiddlers = []; // 存储前 10 个最大值（有序）

    let wordsTotal = 0;
    tiddlers.forEach((tiddler) => {
      if (!$tw.wiki.tiddlerExists(tiddler)) return;
      const text = $tw.wiki.getTiddler(tiddler).fields?.text;
      if (!text) return;

      const wordCount = getTextTotal(text);
      wordsTotal += wordCount;
      const entry = { title: tiddler, wordCount };

      if (topTiddlers.length < 20) {
        // 直接插入，并保持有序（降序）
        topTiddlers.push(entry);
        topTiddlers.sort((a, b) => b.wordCount - a.wordCount);
      } else if (wordCount > topTiddlers[19].wordCount) {
        // 只替换最小值，并保持排序
        topTiddlers[19] = entry;
        topTiddlers.sort((a, b) => b.wordCount - a.wordCount);
      }
    });

    // 防止title 含有|
    const res = topTiddlers
      .map(
        (t, index) =>
          `${index + 1}. <$link to="${t.title}" /> (${t.wordCount.toLocaleString()}字)`,
      )
      .join('\n\n');
    if (!_filter) {
      $tw.wiki.addTiddler({
        title: '$:/state/reading-time-full',
        text: res,
      });
    }
    return wordsTotal.toLocaleString();
  };
})();
