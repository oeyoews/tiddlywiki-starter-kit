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
  const actions = ['library', 'main', 'example'];

  // different dirs
  // library
  await $`npx ${bin} ${libbuild} --build ${actions[0]}`;
  // main
  await $`npx ${bin} --build ${actions[1]} `;
  // example
  await $`npx ${bin} dev --build ${actions[2]} `;

  // after building
  await $`mv ${library} ${dist}`;
  await $`cp -r files src/vercel.json src/index.html img/default-2.jpg ${dist}`;
  msg.finish('Building Finished(for oyeoews)');
});
