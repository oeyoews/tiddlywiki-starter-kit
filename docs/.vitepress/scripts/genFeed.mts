import path from 'path';
import { writeFileSync } from 'fs';
import { Feed } from 'feed';
import { createContentLoader, type SiteConfig } from 'vitepress';

const baseUrl = `https://tiddlywiki-starter-kit.oeyoews.top`;

export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: 'TiddlyWiki5 Starter Kit',
    description: '',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: '',
    favicon: `${baseUrl}/favicon.ico`,
    copyright: 'Copyright (c) 2021-present, oeyoews',
  });

  const posts = await createContentLoader('dev/*.md', {
    excerpt: true,
    render: true,
  }).load();

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string) -
      +new Date(a.frontmatter.date as string),
  );

  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      // content: html?.replaceAll('&ZeroWidthSpace;', ''),
      author: [
        {
          name: frontmatter.author,
          link: frontmatter.twitter
            ? `https://twitter.com/${frontmatter.twitter}`
            : undefined,
        },
      ],
      date: frontmatter.date,
    });
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2());
}
