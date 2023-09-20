import ci from 'ci-info';

const localPlugins = [
  'tiddlywiki/codemirror',
  'tiddlywiki/codemirror-autocomplete',
  'tiddlywiki/codemirror-mode-css',
  'tiddlywiki/codemirror-search-replace',
  'tiddlywiki/codemirror-closebrackets',
  'tiddlywiki/codemirror-mode-markdown',
  'tiddlywiki/codemirror-mode-xml',
  'tiddlywiki/codemirror-mode-javascript',
  'oeyoews/tiddlywiki-motion',
  'oeyoews/neotw-vimjk',
];

const onlinePlugins = [
  'oeyoews/neotw-fetch',
  'oeyoews/tiddlywiki-github-share',
];

/** @description tiddlywiki 启用插件列表 */
let plugins = [
  // 必选依赖
  'tiddlywiki/filesystem',
  'tiddlywiki/tiddlyweb',
  'tiddlywiki/highlight',
  'tiddlywiki/browser-sniff',
  'tiddlywiki/pluginlibrary',
  'tiddlywiki/markdown',
  'oeyoews/neotw-image-better',
  'oeyoews/neotw-pwa',
  'oeyoews/neotw-error-better',
  'oeyoews/neotw-zen-mode',
  'oeyoews/neotw-notranslate',
  'oeyoews/neotw-placeholder',
  'oeyoews/commandpalette',
  'oeyoews/neotw-icons',
  'oeyoews/neotw-markdown-extensions',
  'oeyoews/neotw-swal2',
  'oeyoews/neotw-copy-code',
  'oeyoews/tiddlywiki-cards',
  'oeyoews/tiddlywiki-daylight',
  'oeyoews/tiddlywiki-videos',
  'oeyoews/neotw',
  'oeyoews/NPL',
  'oeyoews/tiddlywiki-back-to-top',
  'oeyoews/tiddlywiki-modal-ui',
  'oeyoews/tiddlywiki-publish-tiddler',
  'oeyoews/tiddlywiki-tailwindcss-plus',
  'oeyoews/neotw-notion-gallery',
  'oeyoews/tiddlywiki-tiddler-info',
  'oeyoews/tiddlywiki-gravatar',
  'oeyoews/neotw-homepage',
  'oeyoews/tiddlywiki-readonly',
];

const dynamicPlugins = ci.isCI ? onlinePlugins : localPlugins;

plugins.push(...dynamicPlugins);

export default plugins;
