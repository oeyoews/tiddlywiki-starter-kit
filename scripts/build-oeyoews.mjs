#!/usr/bin/env zx

import msg from './lib/info.mjs';
import * as dotenv from 'dotenv';
// import { makeTemplate } from './make-template.mjs';

dotenv.config();

$.verbose = true;

// process.env.TIDDLYWIKI_PLUGIN_PATH = './';
// process.env.TIDDLYWIKI_THEME_PATH = './';

const bin = 'tiddlywiki';
const dist = 'dist';

await spinner('Building ...', async () => {
  msg.info();

  // updatecommit();

  // clean generated files
  await $`rm -rf ${dist}`;

  // update tailwindcss styles.min.css

  // await $`yarn build:tailwindcss`;
  // TODO have some dependency
  // await $`node scripts/minify.png.js`;

  // rss
  // await $`npx ${bin} --build feed`;

  // library
  await $`npx ${bin} --build library`;

  /* edition */
  // need dotenv to add library
  await $`npx ${bin} editions/neotw --build editions`;

  // build index
  await $`npx ${bin} --build index`;
  // build readable name plugins
  await $`npx ${bin} --build plugins`;
  /** notebook theme */
  await $`npx ${bin} --build themes`;
  // build empty
  // await $`npx ${bin} --build neotw-empty`;

  // build static
  // await $`cp -r static-patch tiddlers/static-patch`;
  // await $`npx ${bin} --build static`;
  // await $`npx tiddlywiki --output dist --render '[!is[system]]' '[addprefix[static/]addsuffix[.html]]'`;
  // await $`npx tiddlywiki  --output dist --rendertiddler "$:/core/templates/static.template.css" "static/static.css"`;
  // await $`rm -rf tiddlers/static-patch`;
  // move static to root
  // await $`cp dist/static/* dist/`;

  // minify index.html
  await $`npx html-minifier-terser -c ./config/html-minifier-terser-config.json -o dist/index.html dist/index.html`;
  // misc
  await $`cp -r files vercel.json ${dist}`;
  // await $`cp dist/static/index.html ${dist}`;
  // make template at the end of
  // copy readme file
  // TODO: add cn readme
  // await $`cp plugins/oeyoews/neotw/files/README.md README.md`;
  // msg
  msg.finish('Building Finished(for oyeoews)');
});

// makeTemplate();
