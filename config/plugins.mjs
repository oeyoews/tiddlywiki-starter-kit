import ci from 'ci-info';

const localPlugins = [
  'tiddlywiki/tiddlyweb',
  'tiddlywiki/codemirror',
  'tiddlywiki/codemirror-autocomplete',
  'tiddlywiki/codemirror-mode-css',
  'tiddlywiki/codemirror-search-replace',
  'tiddlywiki/codemirror-closebrackets',
  'tiddlywiki/codemirror-mode-markdown',
  'tiddlywiki/codemirror-mode-xml',
  'tiddlywiki/codemirror-mode-javascript',
  'oeyoews/neotw-unsplash',
  'oeyoews/tiddlywiki-motion',
  'oeyoews/neotw-vimjk',
];

const onlinePlugins = [
  'oeyoews/neotw-pwa',
  'oeyoews/NPL',
  'oeyoews/neotw-fetch',
  'oeyoews/tiddlywiki-github-share',
];

/**
 * @description tiddlywiki 启用插件列表
 */
let plugins = [
  // 必选依赖
  'tiddlywiki/filesystem',
  'tiddlywiki/highlight',
  'tiddlywiki/browser-sniff',
  'tiddlywiki/freelinks',
  'tiddlywiki/pluginlibrary',
  'tiddlywiki/markdown',
  'oeyoews/neotw-zen-mode',
  'oeyoews/neotw-notranslate',
  'oeyoews/neotw-placeholder',
  'oeyoews/commandpalette',
  'oeyoews/neotw-icons',
  'oeyoews/neotw-markdown-extensions',
  'oeyoews/neotw-swal2',
  'oeyoews/neotw-copy-code',
  'oeyoews/tiddlywiki-cards',
  'oeyoews/neotw-aplayer',
  'oeyoews/tiddlywiki-daylight',
  'oeyoews/tiddlywiki-videos',
  'oeyoews/neotw',
  'oeyoews/tiddlywiki-back-to-top',
  'oeyoews/tiddlywiki-modal-ui',
  'oeyoews/tiddlywiki-publish-tiddler',
  'oeyoews/tiddlywiki-tailwindcss-plus',
  'oeyoews/tiddlywiki-tiddler-info',
  'oeyoews/tiddlywiki-gravatar',
  'oeyoews/neotw-homepage',
  'oeyoews/tiddlywiki-readonly',
];

const dynamicPlugins = ci.isCI ? onlinePlugins : localPlugins;

plugins.push(...dynamicPlugins);

export default plugins;
