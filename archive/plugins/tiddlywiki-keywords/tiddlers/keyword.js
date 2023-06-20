/*\
title: $:/plugins/oeyoews/tiddlywiki-keywords/keywords-js
// module-type: macro
type: application/javascript

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';
  exports.name = 'kw';

  exports.params = [{ name: 'kw' }];

  exports.run = function (kw) {
    const mark = $tw.fakeDocument.createElement('mark');
    const p = document.createElement('div');
    mark.className = 'px-1 rounded-sm font-normal ';
    mark.textContent = kw;

    return mark.textContent;
  };
})();
