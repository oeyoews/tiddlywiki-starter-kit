/*\
title: $:/plugins/oeyoews/neotw-info/info.js
type: application/javascript
module-type: library

\*/

module.exports = function createContainer() {
  const createElement = $tw.utils.domMaker;
  const wiki = $tw.wiki;

  function createImg(msg, text, logo = '') {
    return createElement('img', {
      class: 'rounded-none',
      attributes: {
        src: logo
          ? `https://img.shields.io/badge/${msg}-${text}-green?style=social&logo=${logo}`
          : `https://img.shields.io/badge/${msg}-${text}-green?style=social`,
      },
    });
  }

  const updateTime = wiki.filterTiddlers(
    '[!is[system]!prefix[$:/]!has[draft.of]!sort[modified]limit[1]get[modified]format:relativedate[]]',
  );
  const pluginsCount = wiki.filterTiddlers('[plugin-type[plugin]]').length;
  const tagsCount = wiki.filterTiddlers('[tags[]]').length;
  const tiddlersCount = wiki.filterTiddlers('[!is[system]]').length;
  const version = $tw.version.replace(/-/g, ' ');

  const list = [
    { msg: 'Version', text: version, logo: 'tiddlywiki' },
    { msg: '✏️ Update', text: updateTime },
    { msg: '🧩 Plugins', text: pluginsCount },
    { msg: '🏷️ Tags', text: tagsCount },
    { msg: '🐟 Tiddlers', text: tiddlersCount }, //  🐸
  ];

  let children = [];
  list.forEach(({ msg, text, logo }) => {
    children.push(createImg(msg, text, logo));
  });

  const container = createElement('div', {
    class: 'space-x-2',
    children,
  });
  return container;
};
