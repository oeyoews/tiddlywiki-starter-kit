/*\
title: $:/plugins/oeyoews/neotw-info/data.js
type: application/javascript
module-type: library

data
\*/

module.exports = () => {
  const getString = (filter) => {
    return $tw.wiki.filterTiddlers(filter);
  };

  const updateTime = getString(
    '[!is[system]!prefix[$:/]!has[draft.of]!sort[modified]limit[1]get[modified]format:relativedate[]]',
  )[0];
  const pluginsCount = getString('[plugin-type[plugin]]').length;
  const tagsCount = getString('[tags[]]').length;
  const tiddlersCount = getString('[!is[system]]').length.toLocaleString();
  const version = $tw.version.replace(/-/g, ' ');

  return [
    { msg: 'Version', text: version, logo: 'tiddlywiki' },
    { msg: '✏️ Update', text: updateTime },
    { msg: '🧩 Plugins', text: pluginsCount },
    { msg: '🏷️ Tags', text: tagsCount },
    { msg: '🐟 Tiddlers', text: tiddlersCount }, //  🐸
  ];
};
