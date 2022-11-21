#!/usr/bin/env zx

// update-git-commit

import replace from "replace";
// import info from "./info.mjs";
// info.

// enable quiet mode
$.verbose = false;

const reg = /LONGID/g;
const reg2 = /SHORTID/g;
// longCommit
const commit = await $`git rev-parse HEAD`;
const longCommit = commit.toString().trim();
// shortCommit
const shortCommit = longCommit.toString().substring(0, 7);
const commitTemplate = "templates/commit-template.tid";
const commitFile = "tiddlers/commit.tid";
const library = "library";
const libpath = "node_modules/tiddlywiki";
const bin = "tiddlywiki";
const subwiki = "subwiki";
const dist = "dist";
const timestamp = new Date().getTime();
const prefix = "/tmp/neotw-";
const buildDir = prefix + timestamp;
const copyFiles = ["tiddlers", "dev", "tiddlywiki.info"];

/**
 * NOTE: dont't use async to rm files
 */

// clean generated files
await $`rm -rf ${dist} ${library}`;
// clean buildlib files
await $`rm -rf ${libpath}/plugins/oeyoews ${libpath}/library-template`;
// clean build dir
await $`rm -rf ${prefix}*`;

async function updateCommit() {
  await $`cp ${commitTemplate} ${commitFile}`;
  replace({
    regex: reg,
    replacement: longCommit,
    paths: [commitFile],
    recursive: true,
    silent: true,
  });

  replace({
    regex: reg2,
    replacement: shortCommit,
    paths: [commitFile],
    recursive: true,
    silent: true,
  });
}

/**
 * @param {any} copyFiles
 */
async function copyTwFile(copyFiles) {
  // clean last build dir
  await $`mkdir -p ${buildDir}`;

  // copy files
  for (var i in copyFiles) {
    // copy build file to temp dir
    await $`cp -r ${copyFiles[i]} ${buildDir}`;
    // clean subwiki when build on local
    await $`rm -rf ${buildDir}/tiddlers/${subwiki}`;
    await $`rm -rf ${buildDir}/tiddlers/trashbin`;
  }
}

/* buildLib */
async function buildLib() {
  await $`mkdir ${libpath}/plugins/oeyoews`;
  await $`cp -r dev/plugins/* ${libpath}/plugins/oeyoews`;
  await $`cp -r src/library-template ${libpath}`;
  await $`npx ${bin} ${libpath}/library-template/ --build library`;
}

/* buildTw */
async function buildTw() {
  // generate main.html example.html library index.html
  await $`npx ${bin} ${buildDir} --build main`;
  // generate example.html after have dist dir
  await $`npx ${bin} dev --build example`;
  // after building
  await $`mv ${library} ${dist}`;
  // copy vercel.json, index.html
  await $`cp src/vercel.json src/index.html img/default.png ${dist}`;
}

// updateCommit
updateCommit();

// copyfiles
copyTwFile(copyFiles);

// buildLib
buildLib();

// build tw
buildTw();
