/*\
title: $:/plugins/oeyoews/cmp/lib/getTiddlersWithTag.js
type: application/javascript
module-type: library

\*/

//helper function to retrieve all tiddlers (+ their fields) with a tag
module.exports = function getTiddlersWithTag(tag) {
  let tiddlers = $tw.wiki.getTiddlersWithTag(tag);
  return tiddlers.map((t) => $tw.wiki.getTiddler(t));
};
