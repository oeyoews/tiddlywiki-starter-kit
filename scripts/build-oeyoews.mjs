#!/usr/bin/env zx

import { spinner } from 'zx/experimental';
import msg from './lib/info.mjs';
import updatecommit from './lib/update-commit.mjs';

$.verbose = false;

process.env.TIDDLYWIKI_PLUGIN_PATH = './';

const bin = 'tiddlywiki';
const dist = 'dist';

await spinner('Building ...', async () => {
  msg.info();

  updatecommit();

  // clean generated files
  await $`rm -rf ${dist}`;

  // library
  await $`npx ${bin} --build library`;

  /* edition */
  await $`npx ${bin} editions/neotw --output dist/editions --build index`;

  // build index
  await $`npx ${bin} --build index`;
  // build readable name plugins
  await $`npx ${bin} --build plugins`;
  // build empty
  // await $`npx ${bin} --build neotw-empty`;
  // build static
  await $`cp -r static-patch tiddlers`;
  await $`npx ${bin} --build static`;
  // await $`npx tiddlywiki --output dist --render '[!is[system]]' '[addprefix[static/]addsuffix[.html]]'`;
  // await $`npx tiddlywiki  --output dist --rendertiddler "$:/core/templates/static.template.css" "static/static.css"`;
  await $`rm -rf tiddlers/static-patch`;

  // minify index.html
  await $`npx html-minifier-terser -c ./config/html-minifier-terser-config.json -o dist/index.html dist/index.html`;
  // misc
  await $`cp -r files vercel.json ${dist}`;
  // copy readme file
  await $`cp plugins/neotw/README.md README.md`;
  // msg
  msg.finish('Building Finished(for oyeoews)');
});
