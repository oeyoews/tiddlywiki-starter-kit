import ci from 'ci-info';

const enableCME = process.env.ENABLECME === 'true';
const enableMarkdown = process.env.ENABLEMARKDOWN === 'true';

const cmePlugins = [
  'tiddlywiki/codemirror',
  'tiddlywiki/codemirror-autocomplete',
  'tiddlywiki/codemirror-mode-css',
  'tiddlywiki/codemirror-search-replace',
  'tiddlywiki/codemirror-closebrackets',
  'tiddlywiki/codemirror-mode-markdown',
  'tiddlywiki/codemirror-mode-xml',
  'tiddlywiki/codemirror-mode-javascript',
  'oeyoews/neotw-vimjk',
];

const localPlugins = ['oeyoews/neotw-cli-info'];

const onlinePlugins = [
  'oeyoews/neotw-fetch',
  'oeyoews/tiddlywiki-github-share',
  'oeyoews/tiddlywiki-readonly',
  'oeyoews/neotw-notranslate',
];

const markdowPlugins = [
  'tiddlywiki/markdown',
  'oeyoews/neotw-markdown-extensions',
];

const plugins = [
  'tiddlywiki/filesystem',
  'tiddlywiki/tiddlyweb',
  'tiddlywiki/highlight',
  'tiddlywiki/browser-sniff',
  'oeyoews/neotw-image-better',
  'oeyoews/tiddlywiki-motion',
  'oeyoews/neotw-pwa',
  'oeyoews/neotw-zen-mode',
  'oeyoews/commandpalette',
  'oeyoews/neotw-icons',
  'oeyoews/neotw-swal2',
  'oeyoews/neotw-copy-code',
  'oeyoews/tiddlywiki-daylight',
  'oeyoews/tiddlywiki-videos',
  'oeyoews/neotw',
  'oeyoews/neotw-info',
  'oeyoews/neotw-reverse-card',
  'oeyoews/tiddlywiki-back-to-top',
  'oeyoews/tiddlywiki-modal-ui',
  'oeyoews/tiddlywiki-publish-tiddler',
  'oeyoews/tiddlywiki-tailwindcss-plus',
  'oeyoews/neotw-notion-gallery',
  'oeyoews/tiddlywiki-tiddler-info',
  'oeyoews/tiddlywiki-gravatar',
  'oeyoews/neotw-homepage',
];

const dynamicPlugins = ci.isCI ? onlinePlugins : localPlugins;

enableMarkdown && plugins.push(...markdowPlugins);
enableCME && localPlugins.push(...cmePlugins);

plugins.push(...dynamicPlugins);

export default plugins;
