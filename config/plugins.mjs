import ci from 'ci-info';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const enableCME = process.env.ENABLECME === 'true';
const enableMarkdown = process.env.ENABLEMARKDOWN === 'true';
const enableQRCode = process.env.ENABLE_QRCODE === 'true';
const wikiLocation = process.env.wikiLocation;

const addColor = (enableOption, color = 'green') => chalk[color](enableOption);

console.log(`
  CODEMIRROR: ${addColor(enableCME)}
  MARKDOWN: ${addColor(enableMarkdown)}
  QRCODE: ${addColor(enableQRCode)}
  wikiLocation: ${addColor(wikiLocation, 'cyan')}
`);

const localPlugins = ['oeyoews/neotw-cli-info'];

const onlinePlugins = [
  'oeyoews/neotw-fetch',
  'oeyoews/tiddlywiki-github-share',
  'oeyoews/tiddlywiki-readonly',
  'oeyoews/neotw-notranslate',
];

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

const markdowPlugins = ['tiddlywiki/markdown', 'oeyoews/markdown-kit'];

// oeyoews plugins
const oeyoewsPlugins = [
  'NPL',
  'neotw-image-better',
  'tiddlywiki-motion',
  'neotw-pwa',
  'neotw-zen-mode',
  'commandpalette',
  'neotw-icons',
  'neotw-swal2',
  'neotw-copy-code',
  'tiddlywiki-daylight',
  'tiddlywiki-videos',
  'neotw',
  'echarts-addons',
  'neotw-info',
  'neotw-reverse-card',
  'tiddlywiki-back-to-top',
  'tiddlywiki-modal-ui',
  'tiddlywiki-publish-tiddler',
  'tiddlywiki-tailwindcss-plus',
  'neotw-notion-gallery',
  'tiddlywiki-tiddler-info',
  'tiddlywiki-gravatar',
  'neotw-homepage',
];

const oeyoewsFormatedPlugins = oeyoewsPlugins.map((plugin) => {
  return `oeyoews/${plugin}`;
});

const plugins = [
  'tiddlywiki/filesystem',
  'tiddlywiki/tiddlyweb',
  'tiddlywiki/highlight',
  'tiddlywiki/browser-sniff',
  'tiddlywiki/pluginlibrary', // 不会影响json 文件的生成, 负责生成index.html
  ...oeyoewsFormatedPlugins,
];

const dynamicPlugins = ci.isCI ? onlinePlugins : localPlugins;

enableMarkdown && plugins.push(...markdowPlugins);
enableCME && localPlugins.push(...cmePlugins);

plugins.push(...dynamicPlugins);

export default plugins;
