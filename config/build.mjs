import base from './base.mjs';

/** @type {import('tiddlywiki').ITiddlyWikiInfoJSONBuild} */
export default {
  // 需要before index.html 构建 ???
  // json: [
  //   '--render',
  //   '.',
  //   'tiddlers.json',
  //   'text/plain',
  //   '$:/core/templates/exporters/JsonFile',
  //   'exportFilter',
  //   '[!is[system]]',
  // ],
  // "externalimages": [
  // 		--save [is[image]] images
  // 		--setfield [is[image]] _canonical_uri $:/core/templates/canonical-uri-external-image text/plain
  // 		--setfield [is[image]] text "" text/plain
  // 		--render $:/core/save/all externalimages.html text/plain
  // 	]
  /*   reactMd: [
    '--verbose',
    '--output',
    `${config.output}/markdown/React`,
    '--render',
    '[tag[React]]',
    '[addsuffix[.md]]',
    'text/plain',
    '$:/plugins/cdaven/markdown-export/md-tiddler'
  ],
  jsMd: [
    '--verbose',
    '--output',
    `${config.output}/markdown/JavaScript`,
    '--render',
    '[tag[JavaScript]]',
    '[addsuffix[.md]]',
    'text/plain',
    '$:/plugins/cdaven/markdown-export/md-tiddler'
  ],
  starMd: [
    '--verbose',
    '--output',
    `${config.output}/markdown/star`,
    '--render',
    '[tag[剪藏]]',
    '[addsuffix[.md]]',
    'text/plain',
    '$:/plugins/cdaven/markdown-export/md-tiddler'
  ],
  journalMd: [
    '--verbose',
    '--output',
    `${config.output}/markdown/Journal`,
    '--render',
    '[tag[Journal]]',
    '[addsuffix[.md]]',
    'text/plain',
    '$:/plugins/cdaven/markdown-export/md-tiddler'
  ], */
  javascript: [
    '--output',
    `${base.output}`,
    '--render',
    '.',
    'javascript.json',
    'text/plain',
    '$:/core/templates/exporters/JsonFile',
    'exportFilter',
    '[tag[JavaScript]]',
  ],
  journal: [
    '--output',
    `${base.output}`,
    '--render',
    '.',
    'journal.json',
    'text/plain',
    '$:/core/templates/exporters/JsonFile',
    'exportFilter',
    '[tag[Journal]type[text/markdown]!sort[created]]',
  ],
  sitemap: [
    '--output',
    `${base.output}`,
    '--render',
    '$:/plugins/oeyoews/neotw-sitemap/sitemap',
    'sitemap.xml',
    'text/plain',
  ],
  tiddlers: [
    '--render',
    '.',
    'tiddlers.json',
    'text/plain',
    '$:/core/templates/exporters/JsonFile',
    'exportFilter',
    // '[!is[system]field:type[text/markdown]!is[binary]!field:publish[readonly]!field:publish[no]] -[[.gitignore]] -[tag[video]] -[tag[Journal]] -[tag[剪藏]]',
    // '[publish[public]] [publish[article]]',
    '[publish[blog]]',
  ],
  // build index.html
  index: [
    '--verbose',
    '--output',
    base.output,
    '--deletetiddlers',
    '$:/StoryList',
    '--render',
    '$:/plugins/tiddlywiki/tiddlyweb/save/offline',
    'offline.html', // '[[external-]addsuffix<version>addsuffix[.html]]',
    'text/plain',
    '--render',
    '$:/plugins/tiddlywiki/tiddlyweb/save/offline',
    'tiddlers.json', // '[[external-]addsuffix<version>addsuffix[.html]]',
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
    '',
    'publishFilter',
    '-[tag[private]] -[is[draft]] -[publish[private]]',
  ],
  library: [
    '--output',
    `${base.output}/library`,
    '--makelibrary',
    '$:/UpgradeLibrary',
    '--savelibrarytiddlers',
    '$:/UpgradeLibrary',
    '[prefix[$:/plugins/oeyoews/]]', // [prefix[$:/themes/nico]]
    'recipes/library/tiddlers/',
    '$:/UpgradeLibrary/List',
    '--savetiddler',
    '$:/UpgradeLibrary/List',
    'recipes/library/tiddlers.json',
    '--rendertiddler',
    '$:/plugins/tiddlywiki/pluginlibrary/library.template.html', // 这里用到了pluginlibrary, 其实就是一个html
    'index.html',
    'text/plain',
    '--deletetiddlers', // NOTE: 如果构建失败总是会产生17M的文件,不会自动删除
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
