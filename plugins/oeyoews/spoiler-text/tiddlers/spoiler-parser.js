/*\
title: $:/plugins/oeyoews/spoiler-text/rules/SpoilerText.js
type: application/javascript
module-type: wikirule

|*spoiler text*|

based on https://github.com/TiddlyWiki/TiddlyWiki5/blob/master/core/modules/parsers/wikiparser/rules/prettylink.js
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'spoiler';
  exports.types = { inline: true };

  exports.init = function (parser) {
    this.parser = parser;
    // Regexp to match
    this.matchRegExp = /\|\*(.*?)\*\|/gm;
  };

  exports.parse = function () {
    // Move past the match
    var start = this.parser.pos + 2;
    this.parser.pos = this.matchRegExp.lastIndex;
    // Process the link
    var text = this.match[1],
      link = this.match[2] || text,
      textEndPos = this.parser.source.indexOf('|', start);
    if (textEndPos < 0 || textEndPos > this.matchRegExp.lastIndex) {
      textEndPos = this.matchRegExp.lastIndex - 2;
    }
    var linkStart = this.match[2] ? start + this.match[1].length + 1 : start;
    var linkEnd = linkStart + link.length;
    return [
      {
        type: 'element',
        tag: 's-t',
        children: [
          {
            type: 'text',
            text,
            start: linkStart,
            end: linkEnd,
          },
        ],
      },
    ];
  };
})();
