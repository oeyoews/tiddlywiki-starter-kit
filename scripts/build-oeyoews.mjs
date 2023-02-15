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

  // main
  await $`npx ${bin} --build main`;

  // static
  await $`npx ${bin} --build static`;

  // build readable name plugins
  await $`npx ${bin} --build plugins`;

  await $`npx ${bin} --build neotw-empty`;

  // after building
  await $`mv ${library} ${dist}`;
  await $`npx html-minifier-terser -c html-minifier-terser-config.json -o dist/main.html dist/main.html`;
  await $`cp -r files vercel.json src/index* img/default2.avif ${dist}`;
  msg.finish('Building Finished(for oyeoews)');
});
