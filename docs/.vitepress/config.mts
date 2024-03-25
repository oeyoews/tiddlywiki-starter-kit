import { defineConfig } from 'vitepress';
import nav from './scripts/nav.mjs';
import sidebar from './scripts/sidebar.mts';
import cn from './scripts/cn.mts';

export default defineConfig({
  title: 'TiddlyWiki Starter Kit',
  description: '📦 使用 TiddlyWiki5 搭建的本地优先笔记软件',
  base: '/docs/',
  lastUpdated: true,
  cleanUrls: true,
  // metaChunks: true,
  appearance: 'dark',
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
});
