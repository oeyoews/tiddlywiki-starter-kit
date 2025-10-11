import base from './base.mjs';
import devplugins from './dev-plugins.mjs';
import ci from 'ci-info';

// 用户插件列表
// NOTE: vercel not support use { isCi } ???
const enableMarkdown = base.markdown;

// 本地运行使用到的插件
const localPlugins = [
  'oeyoews/tiddlywiki-publish-tiddler',
  'oeyoews/neotw-vue3', // -dev
  'oeyoews/clean-your-duplicate-storylist',
  'oeyoews/neotw-startup-times',
  'oeyoews/tiddlywiki-tid2png',
];

const onlinePlugins = [
  'oeyoews/confetti-background',
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
  ...devplugins,
  // vue
  'vue-i18n',
  'vue-contextmenu', // right-contextmenu
  'vue-context-menu', // lib
  'vue-draggable-plus', // 拖拽插件 lib
  'vue-kanban',
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
  // 'mermaid-widget',
  // 'mermaid930',
  // 'markdown-it-mermaid',
  'mermaid',
  'medium-zoom',
  'neotw-draft-better',
  // 'confetti',
  'image-observer', // personal lib
  // md
  // 'markdown-it-twemoji',
  'markdown-it-emoji',
  'neotw-ai',
  'markdown-it-spoiler',
  'markdown-it-math',
  'markdown-it-pangu',
  'markdown-it-abbr',
  'markdown-it-front-matter',
  'markdown-it-github-alert',
  'markdown-extensions-startup',
  // 'skill-badges',
  'notebook-theme-sidebar-resizer',
  'qrcode', // render a qrcode with any text
  'neotw-spotlight', // image zoom
  'neotw-image-gallery',
  'tiddlywiki-motion', // vim user like it
  'neotw-zen-mode',
  'neotw-icons',
  'neotw-menubar',
  'neotw-copy-code2',
  'tiddlywiki-daylight',
  'tiddlywiki-videos',
  'echarts-addons',
  // lib
  'nprogress',
  'notify', // vue notify lib
  // ui
  'tiddlywiki-modal-ui',
  'tiddlywiki-tailwindcss-v4',
  'neotw-notion-gallery',
  'tiddlywiki-tiddler-info',
  'tiddlywiki-gravatar',
  // core
  'neotw-pwa', // pwa for tw
  'neotw-homepage',
  'neotw',
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

// switch (ci.name) {
//   case 'Vercel':
//   case 'Netlify CI':
//     plugins.push(...onlinePlugins);
//     break;
//   default:
//     plugins.push(...localPlugins);
// }

if (ci.isCI) {
  plugins.push(...onlinePlugins);
} else {
  plugins.push(...localPlugins);
}

export default [...new Set(plugins)];
