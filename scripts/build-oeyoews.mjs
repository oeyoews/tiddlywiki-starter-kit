#!/usr/bin/env zx

import { spinner } from 'zx/experimental';
import msg from './lib/info.mjs';
import updatecommit from './lib/update-commit.mjs';

$.verbose = false;

const library = 'library';
const libpath = 'node_modules/tiddlywiki';
const bin = 'tiddlywiki';
const dist = 'dist';

await spinner('Building ...', async () => {
  msg.info();

  updatecommit();

  // clean generated files
  await $`rm -rf ${dist} ${library}`;
  await $`rm -rf tiddlers/trashbin`;
  // clean buildlib files
  await $`rm -rf ${libpath}/plugins/oeyoews ${libpath}/library-template`;

  /* buildLib */
  await $`mkdir ${libpath}/plugins/oeyoews`;
  await $`cp -r dev/plugins/* ${libpath}/plugins/oeyoews`;
  await $`cp -r src/library-template ${libpath}`;

  const libbuild = libpath + '/library-template/';

  // different dirs
  // library
  await $`npx ${bin} ${libbuild} --build library`;

  // build index
  await $`npx ${bin} --build index`;
  // build readable name plugins
  await $`npx ${bin} --build plugins`;
  // build empty
  await $`npx ${bin} --build neotw-empty`;
  await $`cp -r static-patch tiddlers`;
  // build static
  await $`npx ${bin} --build static`;
  await $`rm -rf tiddlers/static-patch`;

  // after building
  await $`mv ${library} ${dist}`;
  // minify index.html
  await $`npx html-minifier-terser -c ./config/html-minifier-terser-config.json -o dist/index.html dist/index.html`;
  // misc
  await $`cp -r files vercel.json ${dist}`;
  // copy readme file
  await $`cp dev/plugins/neotw/README.md README.md`;
  // msg
  msg.finish('Building Finished(for oyeoews)');
});
