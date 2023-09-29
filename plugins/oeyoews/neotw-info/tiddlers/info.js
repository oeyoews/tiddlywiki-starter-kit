/*\
title: $:/plugins/oeyoews/neotw-info/info.js
type: application/javascript
module-type: library

\*/

function createContainer() {
  const createElement = $tw.utils.domMaker;
  const wiki = $tw.wiki;

  function createImg(msg, text) {
    return createElement('img', {
      class: 'rounded-none',
      attributes: {
        src: `https://img.shields.io/badge/${msg}-${text}-green?style=social`,
      },
    });
  }

  const updateTime = wiki.filterTiddlers(
    '[!is[system]!prefix[$:/]!has[draft.of]!sort[modified]limit[1]get[modified]format:relativedate[]]',
  );
  const pluginsCount = wiki.filterTiddlers('[plugin-type[plugin]]').length;
  const tagsCount = wiki.filterTiddlers('[tags[]]').length;
  const tiddlersCount = wiki.filterTiddlers('[!is[system]]').length;

  /* const updateImage = createImg('update', updateTime);
  const plugins = createImg('plugins', pluginsCount);
  const tags = createImg('tags', tagsCount);
  const tiddlers = createImg('tiddlers', tiddlersCount); */

  const list = [
    { msg: '✏️ update', text: updateTime },
    { msg: '🧩 plugins', text: pluginsCount },
    { msg: '🏷️ tags', text: tagsCount },
    { msg: '🐟 tiddlers', text: tiddlersCount },
  ];

  let children = [];
  list.forEach(({ msg, text }) => {
    children.push(createImg(msg, text));
  });

  const container = createElement('div', {
    class: 'space-x-2',
    children,
  });
  return container;
}

module.exports = createContainer;
