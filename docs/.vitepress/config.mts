import { defineConfig } from 'vitepress';
import nav from './scripts/nav.mts';
import sidebar from './scripts/sidebar.mts';
import cn from './scripts/cn.mts';
import head from './scripts/head.mts';
import { genFeed } from './scripts/genFeed.mjs';

export default defineConfig({
  title: 'TiddlyWiki Starter Kit',
  description: '📦 使用 TiddlyWiki5 搭建的本地优先笔记软件',
  base: '/docs/',
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  appearance: 'dark',
  sitemap: {
    hostname: 'https://tiddlywiki-starter-kit.oeyoews.top/docs',
  },
  head,
  vite: {},
  markdown: {
    image: {
      // image lazy loading is disabled by default
      lazyLoading: true,
    },
  },
  // mpa: true,
  outDir: '../.tiddlywiki/docs',
  themeConfig: {
    logo: '/tiddlywiki.png',
    editLink: {
      pattern:
        'https://github.com/oeyoews/tiddlywiki-starter-kit/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    nav,
    sidebar,

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/oeyoews/tiddlywiki-starter-kit',
      },
    ],
    ...cn,
  },
  buildEnd: genFeed,
});
