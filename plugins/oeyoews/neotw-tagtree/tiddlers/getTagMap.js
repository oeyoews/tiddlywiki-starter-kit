/*\
title: $:/plugins/oeyoews/neotw-tagtree/getTagMap.js
type: application/javascript
module-type: library

\*/

module.exports = function getTagMap() {
  const wiki = $tw.wiki;
  const tagtree = wiki.getTagMap();
  const tags = Object.entries(tagtree)
    .filter(([tag]) => !tag.startsWith('$:/'))
    .map(([tag, item]) => {
      const filteredtag = { tag, item };
      return filteredtag;
    });
  // console.log(tags);

  return tags;
};
