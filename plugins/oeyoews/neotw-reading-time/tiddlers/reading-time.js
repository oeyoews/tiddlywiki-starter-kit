/*\
title: $:/plugins/oeyoews/neotw-reading-time/reading-time.js
type: application/javascript
module-type: macro

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const estimateReadingTime = require('./lib');
  exports.name = 'reading-time'; // book image header

  exports.params = [
    {
      name: 'tiddler',
    },
  ];

  exports.run = function (_tiddler) {
    const tiddler = this.getVariable('currentTiddler') || _tiddler;
    const text = $tw.wiki.getTiddler(tiddler)?.fields?.text;
    return estimateReadingTime(text);
  };
})();
