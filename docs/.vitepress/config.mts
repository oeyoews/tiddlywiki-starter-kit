import cn from './scripts/cn.mts';
import { genFeed } from './scripts/genFeed.mjs';
import head from './scripts/head.mts';
import nav from './scripts/nav.mts';
import sidebar from './scripts/sidebar.mts';
import { buildEndGenerateOpenGraphImages } from '@nolebase/vitepress-plugin-og-image';
import MarkdownTask from 'markdown-it-task-lists';
import UnoCSS from 'unocss/vite';
import { defineConfig, defineConfigWithTheme } from 'vitepress';

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

      // https://github.com/vuejs/vitepress/discussions/3724#discussioncomment-8963669
      const defaultCodeInline = md.renderer.rules.code_inline!;
      md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        tokens[idx].attrSet('v-pre', '');
        return defaultCodeInline(tokens, idx, options, env, self);
      };
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
      baseUrl: 'https://tiddlywiki-starter-kit.oeyoews.top/docs',
      category: {
        byPathPrefix: [
          {
            prefix: '/plugins/',
            text: 'Plugin',
          },
        ],
        fallbackWithFrontmatter: true,
      },
    })(siteconfig);
  },
});
