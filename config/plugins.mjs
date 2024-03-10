import ci from 'ci-info';
import config from './index.js';

// TODO: support remove plugins from here
export const devPlugins = [
  'vue-info',
  'vue-draggable-plus',
  'vue-random-cards'
];

// NOTE: vercel not support use { isCi } ???
const enableMarkdown = config.markdown;

const localPlugins = [
  'oeyoews/tiddlywiki-publish-tiddler',
  'oeyoews/neotw-vue3' // -dev
  // 'oeyoews/neotw-cli-info',
  // 'oeyoews/tiddlywiki-tid2png',
];

const onlinePlugins = [
  'oeyoews/neotw-error-better',
  'oeyoews/tiddlywiki-github-share',
  'oeyoews/neotw-notranslate',
  'oeyoews/neotw-vue3',
  'oeyoews/vue-table'
];

// @deprecated, please use cm6
/* const cmePlugins = [
  'tiddlywiki/codemirror',
  'tiddlywiki/codemirror-autocomplete',
  'tiddlywiki/codemirror-mode-css',
  'tiddlywiki/codemirror-search-replace',
  'tiddlywiki/codemirror-closebrackets',
  'tiddlywiki/codemirror-mode-markdown',
  'tiddlywiki/codemirror-mode-xml',
  'tiddlywiki/codemirror-mode-javascript',
  'oeyoews/neotw-vimjk',
  'oeyoews/neotw-placeholder'
]; */

const markdowPlugins = ['tiddlywiki/markdown', 'oeyoews/markdown-kit'];

// oeyoews plugins
const oeyoewsPlugins = [
  ...devPlugins,
  'neotw-tour',
  // 'tiddlywiki-files',
  // 'neotw-popup-preview',
  // 'neotw-contextmenu',
  // 'tiddlywiki-prettier-lib',
  'markdown-it-twemoji',
  // 'tiddlywiki-prettier',
  // 'mermaid-tiny', // markdown-it-mermaid 支持前，我暂时不用这个版本, 因为同时要装两个版本
  'neotw-dropdown-better',
  'tiddler-fullscreen',
  'neotw-vue-todo',
  'vue3-toastify',
  'vue-links-gallery',
  'vue-i18n',
  'mermaid-widget',
  'mermaid930',
  'markdown-it-mermaid',
  'markdown-it-math',
  'medium-zoom',
  'blockquote',
  // 'editor-preview-resizer',
  'double-click-edit',
  'neotw-draft-better',
  'table-style-fix',
  'confetti-background',
  'confetti',
  'image-observer',
  'markdown-it-emoji',
  'markdown-it-pangu',
  'markdown-it-abbr',
  'markdown-it-front-matter',
  'markdown-it-github-alert',
  'markdown-extensions-startup',
  'translate',
  'skill-badges',
  'notebook-theme-sidebar-resizer',
  'neotw-music-with-howler',
  'tiddlywiki-banners',
  'font-geist',
  'neotw-fetch',
  'qrcode',
  'hitokoto',
  // 'neotw-image-better',
  'notify',
  'NPL',
  'neotw-spotlight',
  'neotw-image-gallery',
  'tiddlywiki-motion',
  'neotw-pwa',
  'neotw-zen-mode',
  'commandpalette',
  'neotw-icons',
  'neotw-copy-code2',
  'tiddlywiki-daylight',
  'tiddlywiki-videos',
  'neotw',
  'echarts-addons',
  'nprogress',
  'tiddlywiki-modal-ui',
  'tiddlywiki-tailwindcss-plus',
  'neotw-notion-gallery',
  'tiddlywiki-tiddler-info',
  'tiddlywiki-gravatar',
  'neotw-homepage'
];

const oeyoewsFormatedPlugins = oeyoewsPlugins.map((plugin) => {
  return `oeyoews/${plugin}`;
});

// based plugins
const plugins = [
  'tiddlywiki/filesystem',
  'tiddlywiki/tiddlyweb',
  'tiddlywiki/highlight',
  'tiddlywiki/browser-sniff',
  'tiddlywiki/pluginlibrary', // 不影响json 文件的生成, 但是需要负责生成index.html
  ...oeyoewsFormatedPlugins
];

enableMarkdown && plugins.push(...markdowPlugins);
// enableCME && localPlugins.push(...cmePlugins); // @deprecated

switch (ci.name) {
  case 'Vercel':
  case 'Netlify CI':
    plugins.push(...onlinePlugins);
    break;
  default:
    plugins.push(...localPlugins);
}

export default plugins;
