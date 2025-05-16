/*\
title: $:/plugins/oeyoews/neotw-cli/startup.js
type: application/javascript
module-type: startup

\*/

exports.name = 'cli-info-startup-hook';
exports.platforms = ['node'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const count = (tag) => {
    return $tw.wiki.filterTiddlers(tag).length;
  };

  const totalPlugins = count('[plugin-type[plugin]]');
  const customPlugins = count('[plugin-type[plugin]author[oeyoews]]');
  const officialPlugins = count(
    '[plugin-type[plugin]prefix[$:/plugins/tiddlywiki]] [[$:/core]]'
  );
  const tiddlersPlugin = totalPlugins - officialPlugins - customPlugins;
  $tw.utils.log(
    `\n@neotw-cli-info plugin\n🐠 太微版本 -> ${$tw.version}
📦 全部插件 -> ${totalPlugins}
👮 官方插件 -> ${officialPlugins}
🔪 用户插件 -> ${customPlugins}
🧩 其他插件 -> ${tiddlersPlugin}\n\n`,
    'cyan'
  );
};
