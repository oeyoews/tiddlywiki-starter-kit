/*\
title: $:/plugins/oeyoews/neotw-info/info.js
type: application/javascript
module-type: library

\*/
module.exports = () => {
  const createElement = $tw.utils.domMaker;
  const wiki = $tw.wiki;
  const baseURL = 'https://img.shields.io/badge';

  const createImg = (msg, text, logo = '') => {
    return createElement('img', {
      class: 'rounded-none',
      attributes: {
        src: logo
          ? `${baseURL}/${msg}-${text}-green?style=social&logo=${logo}`
          : `${baseURL}/${msg}-${text}-green?style=social`,
      },
    });
  };

  const updateTime = wiki.filterTiddlers(
    '[!is[system]!prefix[$:/]!has[draft.of]!sort[modified]limit[1]get[modified]format:relativedate[]]',
  );
  const pluginsCount = wiki.filterTiddlers('[plugin-type[plugin]]').length;
  const tagsCount = wiki.filterTiddlers('[tags[]]').length;
  const tiddlersCount = wiki
    .filterTiddlers('[!is[system]]')
    .length.toLocaleString();
  const version = $tw.version.replace(/-/g, ' ');

  const list = [
    { msg: 'Version', text: version, logo: 'tiddlywiki' },
    { msg: '✏️ Update', text: updateTime },
    { msg: '🧩 Plugins', text: pluginsCount },
    { msg: '🏷️ Tags', text: tagsCount },
    { msg: '🐟 Tiddlers', text: tiddlersCount }, //  🐸
  ];

  const children = [];
  list.forEach(({ msg, text, logo }) => {
    children.push(createImg(msg, text, logo));
  });

  return createElement('div', {
    class: 'space-x-2',
    children,
  });
};
