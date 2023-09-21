import dotenv from 'dotenv';

dotenv.config;

const OUTPUTDIR = process.env.OUTPUTDIR || '.tiddlywiki';

/**
 * @type {import('tw5-typed').ITiddlyWikiInfoJSONBuild}
 * @description tiddlywiki 构建命令
 */
export default {
  // build index.html
  index: [
    '--verbose',
    '--output',
    OUTPUTDIR,
    '--deletetiddlers',
    '$:/StoryList',
    '--render',
    '$:/plugins/tiddlywiki/tiddlyweb/save/offline',
    // '[[external-]addsuffix<version>addsuffix[.html]]',
    'offline.html',
    'text/plain',
    '--render',
    '$:/core/save/offline-external-js',
    'index.html',
    'text/plain',
    '--render',
    '$:/core/templates/tiddlywiki5.js',
    '[[tiddlywikicore-]addsuffix<version>addsuffix[.js]]',
    'text/plain',
    // misc
    '--savetiddler',
    '$:/favicon.ico',
    'favicon.ico',
    '--savetiddler',
    '$:/manifest.json',
    'manifest.json',
    '--savetiddler',
    '$:/tiddlywiki.png',
    'tiddlywiki.png',
    '--deletetiddlers',
    '$:/StoryList',
  ],
  // 生成 plugin library
  library: [
    '--output',
    `${OUTPUTDIR}/library`,
    '--makelibrary',
    '$:/UpgradeLibrary',
    '--savelibrarytiddlers',
    '$:/UpgradeLibrary',
    '[prefix[$:/plugins/oeyoews]] [prefix[$:/themes/nico]]',
    'recipes/library/tiddlers/',
    '$:/UpgradeLibrary/List',
    '--savetiddler',
    '$:/UpgradeLibrary/List',
    'recipes/library/tiddlers.json',
    '--rendertiddler',
    '$:/plugins/tiddlywiki/pluginlibrary/library.template.html',
    'index.html',
    'text/plain',
    '--deletetiddlers', // 如果构建失败总是会产生17M的文件
    '[[$:/UpgradeLibrary]] [[$:/UpgradeLibrary/List]]',
  ],
  /* // Generate plugins json format
  plugins: [
    '--verbose',
    '--output',
    '.tiddlywiki/plugins',
    '--render',
    '[all[tiddlers+shadows]plugin-type[plugin]author[oeyoews]]',
    '[removeprefix[$:/plugins/oeyoews/]slugify[]addsuffix[.json]]',
    'text/plain',
    '$:/core/templates/json-tiddler',
    '--deletetiddlers',
    '$:/StoryList',
  ],
  themes: [
    '--verbose',
    '--output',
    '.tiddlywiki/themes',
    '--render',
    '[all[tiddlers+shadows]plugin-type[theme]author[NicolasPetton]]',
    '[removeprefix[$:/themes/nico]slugify[]addsuffix[.json]]',
    'text/plain',
    '$:/core/templates/json-tiddler',
    '--deletetiddlers',
    '$:/StoryList',
  ], */
};
