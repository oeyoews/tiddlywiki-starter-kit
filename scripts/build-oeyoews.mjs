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
  const actions = ['library', 'example', 'main', 'static', 'plugins'];

  // different dirs
  // library
  await $`npx ${bin} ${libbuild} --build ${actions[0]}`;

  // example
  await $`npx ${bin} dev --build ${actions[1]} `;

  // enable twikoo last before build for main
  await $`cp patch/tidio.tid tiddlers`;
  // main
  await $`npx ${bin} --build ${actions[2]} `;
  // rm twikoo
  await $`rm tiddlers/tidio.tid`;

  await $`npx ${bin} --build ${actions[3]} `;

  // build readable name plugins
  await $`npx ${bin} --build ${actions[4]} `;

  // after building
  await $`mv ${library} ${dist}`;
  await $`cp -r files vercel.json src/index.html img/default2.avif ${dist}`;
  msg.finish('Building Finished(for oyeoews)');
});
