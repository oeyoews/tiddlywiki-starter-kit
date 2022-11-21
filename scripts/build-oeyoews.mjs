#!/usr/bin/env zx

// update-git-commit
// init-info-file
// make lib
// clean
// generate example

const library = "library";
const libpath = "node_modules/tiddlywiki";
const bin = "tiddlywiki";
const subwiki = "subwiki";
const dist = "dist";
const timestamp = new Date().getTime();
const prefix = "/tmp/neotw-";
const buildDir = prefix + timestamp;
const copyFiles = ["tiddlers", "dev", "tiddlywiki.info"];

// dont't use async to rm files
// clean generated files
await $`rm -rf ${dist} ${library}`;
// clean buildlib files
await $`rm -rf ${libpath}/plugins/oeyoews ${libpath}/library-template`;
// clean build dir
await $`rm -rf ${prefix}-*`;

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

/*  */
async function buildLib() {
  await $`mkdir ${libpath}/plugins/oeyoews`;
  await $`cp -r dev/plugins/* ${libpath}/plugins/oeyoews`;
  await $`cp -r src/library-template ${libpath}`;
  await $`npx ${bin} ${libpath}/library-template/ --build library`;
}

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

// copyfiles
copyTwFile(copyFiles);

// buildLib
buildLib();

// build tw
buildTw();
