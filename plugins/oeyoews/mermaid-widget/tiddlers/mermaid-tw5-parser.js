/*\
title: $:/plugins/oeyoews/mermaid-widget/mermaid-tw5-parser.js
type: application/javascript
// module-type: parser

\*/
(function () {
  // jslint node: true, browser: true
  // global $tw: false
  'use strict';
  let MermaidParser = function (type, text, options) {
    let element = {
      type: 'mermaid',
      tag: '$mermaid',
      text,
    };
    this.tree = [element];
  };
  exports['text/vnd.tiddlywiki.mermaid'] = MermaidParser;
  exports['text/mermaid'] = MermaidParser;
})();
