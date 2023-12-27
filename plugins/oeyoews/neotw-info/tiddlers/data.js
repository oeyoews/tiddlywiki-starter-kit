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

  const update = getString(
    '[!is[system]!prefix[$:/]!has[draft.of]!sort[modified]limit[1]get[modified]format:relativedate[]]'
  )[0];
  const plugins = getString('[plugin-type[plugin]]').length;
  const tags = getString('[tags[]]').length;
  const tiddlers = getString('[!is[system]]').length.toLocaleString();
  const version = $tw.version.replace(/-/g, ' ');
  const textClass = 'ml-2 text-sm text-gray-600 dark:text-gray-400';
  const blockClass =
    'flex items-center rounded-full bg-gray-200 dark:bg-gray-700 px-2 py-1';

  return {
    blockClass,
    update,
    plugins,
    tags,
    tiddlers,
    version,
    textClass
  };
};
