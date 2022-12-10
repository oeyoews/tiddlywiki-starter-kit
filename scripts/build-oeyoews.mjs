#!/usr/bin/env zx

import { spinner } from 'zx/experimental';
import replace from 'replace';
import msg from './lib/info.mjs';
import base from './lib/base.mjs';

$.verbose = false;

const headCommit = await $`git rev-parse HEAD`;
const longid = headCommit.toString().trim();
const shortid = longid.substring(0, 7);
const commitTemplate = 'templates/commit-template.tid';
const commitFile = 'tiddlers/commit.tid';
const library = 'library';
const libpath = 'node_modules/tiddlywiki';
const bin = 'tiddlywiki';
const subwiki = 'subwiki';
const dist = 'dist';
const timestamp = base.timestamp();
const tmpdir = os.tmpdir();
const prefix = `${tmpdir}/neotw-`;
const buildDir = `${prefix}${timestamp}`;
// build need files
const copyFiles = ['tiddlers', 'dev', 'files', 'tiddlywiki.info'];

await spinner('Building ...', async () => {
  msg.info();

  // clean generated files
  await $`rm -rf ${dist} ${library}`;
  // clean buildlib files
  await $`rm -rf ${libpath}/plugins/oeyoews ${libpath}/library-template`;
  // clean build dir
  await $`rm -rf ${prefix}*`;

  await $`cp ${commitTemplate} ${commitFile}`;

  const regPlace = {
    longid,
    shortid,
    timestamp,
  };

  for (let i in regPlace) {
    replace({
      regex: new RegExp('\\$\\{' + i + '\\}', 'g'),
      replacement: regPlace[i], // string
      paths: [commitFile], // array
      recursive: true,
      silent: true,
    });
  }

  // clean last build dir
  await $`mkdir -p ${buildDir}`;

  // copy files
  for (let copyFile of copyFiles) {
    // copy build file to temp dir
    await $`cp -r ${copyFile} ${buildDir}`;
    // clean subwiki when build on local
    await $`rm -rf ${buildDir}/tiddlers/${subwiki}`;
    await $`rm -rf ${buildDir}/tiddlers/trashbin`;
  }

  /* buildLib */
  await $`mkdir ${libpath}/plugins/oeyoews`;
  await $`cp -r dev/plugins/* ${libpath}/plugins/oeyoews`;
  await $`cp -r src/library-template ${libpath}`;

  const buildTw = {
    // builddir: target
    [libpath + '/library-template/']: 'library',
    [buildDir]: 'main',
    dev: 'example',
  };

  for (const i in buildTw) {
    await $`npx ${bin} ${i} --build ${buildTw[i]}`;
  }

  // after building
  await $`mv ${library} ${dist}`;
  // copy static files
  await $`cp -r files src/vercel.json src/index.html static img/default-2.jpg ${dist}`;
  msg.finish('Building Finished(for oyeoews)');
});
