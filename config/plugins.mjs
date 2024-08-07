import base from './base.mjs';
import devplugins from './dev-plugins.mjs';
import ci from 'ci-info';

// 用户插件列表
// NOTE: vercel not support use { isCi } ???
const enableMarkdown = base.markdown;

const localPlugins = [
  'oeyoews/tiddlywiki-publish-tiddler',
  'oeyoews/neotw-vue3', // -dev
];

const onlinePlugins = [
  'oeyoews/neotw-vue-codeblock', // 首页代码块
  'oeyoews/vue-plum',
  'oeyoews/NPL',
  'oeyoews/neotw-error-better',
  'oeyoews/tiddlywiki-github-share',
  'oeyoews/neotw-notranslate',
  'oeyoews/neotw-vue3',
  'oeyoews/font-geist', // tw font lib
];

const markdowPlugins = ['tiddlywiki/markdown', 'oeyoews/markdown-kit'];

// oeyoews plugins
const oeyoewsPlugins = [
  'confetti-background',
  ...devplugins,
  'vue-i18n',
  'vue-contextmenu', // right-contextmenu
  'vue-context-menu', // lib
  'vue-draggable-plus', // 拖拽插件 lib
  'vue-kanban',
  // 'vue-tabs',
  // 'vue-pomodoro',
  // 'neotw-vue-todo',
  // 'notivue',
  // 'vue3-toastify',
  'neotw-sitemap',
  'vue-rss',
  'neotw-vue-netease-banner',
  'neotw-vue-journal',
  'neotw-vue-fetch',
  'vue-info',
  'vue-random-cards',
  'neotw-dropdown-better',
  'tiddler-fullscreen',
  'vue-links-gallery',
  'mermaid-widget',
  'mermaid930',
  'markdown-it-mermaid',
  'markdown-it-math',
  'markdown-it-pangu',
  'medium-zoom',
  'blockquote',
  'neotw-draft-better',
  // 'confetti-background',
  // 'confetti',
  'image-observer', // personal lib
  'markdown-it-emoji',
  // 'markdown-it-twemoji',
  'markdown-it-abbr',
  'markdown-it-front-matter',
  'markdown-it-github-alert',
  'markdown-extensions-startup',
  // 'skill-badges',
  'notebook-theme-sidebar-resizer',
  'qrcode', // render a qrcode with any text
  'notify', // vue notify lib
  'neotw-spotlight', // image zoom
  'neotw-image-gallery',
  'tiddlywiki-motion', // vim user like it
  'neotw-pwa', // pwa for tw
  'neotw-zen-mode',
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
  'neotw-homepage',
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
  ...oeyoewsFormatedPlugins,
];

enableMarkdown && plugins.push(...markdowPlugins);

switch (ci.name) {
  case 'Vercel':
  case 'Netlify CI':
    plugins.push(...onlinePlugins);
    break;
  default:
    plugins.push(...localPlugins);
}

export default plugins;
