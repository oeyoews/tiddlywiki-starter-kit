import { defineConfig } from 'vitepress';
import nav from './scripts/nav.mts';
import sidebar from './scripts/sidebar.mts';
import cn from './scripts/cn.mts';
import head from './scripts/head.mts';
import { genFeed } from './scripts/genFeed.mjs';
import { buildEndGenerateOpenGraphImages } from '@nolebase/vitepress-plugin-og-image';
import UnoCSS from 'unocss/vite';
import MarkdownTask from 'markdown-it-task-lists';

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
  vite: {
    plugins: [UnoCSS()],
  },
  markdown: {
    config: (md) => {
      md.use(MarkdownTask);
    },
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
  async buildEnd(siteconfig) {
    genFeed(siteconfig);
    await buildEndGenerateOpenGraphImages({
      domain: 'https://neotw.vercel.app/docs',
      category: {
        byLevel: 3,
      },
    })(siteconfig);
  },
});
