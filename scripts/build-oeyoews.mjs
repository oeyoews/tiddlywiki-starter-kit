#!/usr/bin/env zx

import { spinner } from "zx/experimental";
import replace from "replace";
import msg from "./info.mjs";
import gitCommit from "./git-info.mjs";
import base from "./base.mjs";

$.verbose = false;

const commitTemplate = "templates/commit-template.tid";
const commitFile = "tiddlers/commit.tid";
const library = "library";
const libpath = "node_modules/tiddlywiki";
const bin = "tiddlywiki";
const subwiki = "subwiki";
const dist = "dist";
const timestamp = base.timestamp();
const prefix = "/tmp/neotw-";
const buildDir = `${prefix}${timestamp}`;
const copyFiles = ["tiddlers", "dev", "files", "tiddlywiki.info"];

/**
 * NOTE: dont't use async to rm files or more situations
 */

await spinner("Building ...", async () => {
  msg.info();

  // clean generated files
  await $`rm -rf ${dist} ${library}`;
  // clean buildlib files
  await $`rm -rf ${libpath}/plugins/oeyoews ${libpath}/library-template`;
  // clean build dir
  await $`rm -rf ${prefix}*`;

  await $`cp ${commitTemplate} ${commitFile}`;

  const longCommit = gitCommit.longCommit;
  const shortCommit = gitCommit.shortCommit;
  const regPlace = {
    LONGID: longCommit,
    SHORTID: shortCommit,
    BUILDTIME: timestamp,
  };

  for (const i in regPlace) {
    replace({
      regex: i,
      replacement: regPlace[i],
      paths: [commitFile],
      recursive: true,
      silent: true,
    });
  }

  // clean last build dir
  await $`mkdir -p ${buildDir}`;

  // copy files
  for (const i in copyFiles) {
    // copy build file to temp dir
    await $`cp -r ${copyFiles[i]} ${buildDir}`;
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
    [libpath + "/library-template/"]: "library",
    [buildDir]: "main",
    dev: "example",
  };

  for (const i in buildTw) {
    await $`npx ${bin} ${i} --build ${buildTw[i]}`;
  }

  // after building
  await $`mv ${library} ${dist}`;
  // copy vercel.json, index.html
  await $`cp -r files src/vercel.json src/index.html img/default.png ${dist}`;
  msg.finish("Building Finished(for oyeoews)");
});
