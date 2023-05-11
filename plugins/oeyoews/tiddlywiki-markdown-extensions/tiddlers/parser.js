/*\
title: $:/plugins/oeyoews/tiddlywiki-markdown-extensions/parser.js
type: application/javascript
module-type: parser

Wraps up the markdown-it parser for use as a Parser in TiddlyWiki @emoji

\*/
(function (realRequire) {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  var MarkdownIt = require('markdown-it');
  var md = $tw.Wiki.parsers['text/markdown'].prototype.md;
  var require = function (m) {
    return realRequire(
      '$:/plugins/oeyoews/tiddlywiki-markdown-extensions/markdown-it-' +
        m +
        '.js',
    );
  };

  var emoji = require('emoji');

  md.use(emoji);
})();
