#!/usr/bin/env zx

export async function makeTemplate() {
  // Define variables
  const TEMPLATE_DIR = 'tmp/neotw-template';
  const PLUGINS_DIR = 'dist/plugins';
  const THEMES_DIR = 'dist/themes';
  const UPLOAD_DIR = 'upload';

  // Remove existing template dir
  await $`rm -rf ${TEMPLATE_DIR} ${UPLOAD_DIR}`;

  // Initialize TiddlyWiki server template
  await $`npx tiddlywiki ${TEMPLATE_DIR} --init server`;

  // Create tiddlers dir
  await $`mkdir ${TEMPLATE_DIR}/tiddlers`;

  // Copy plugins and themes to tiddlers dir
  await $`cp -r ${PLUGINS_DIR} ${THEMES_DIR} ${TEMPLATE_DIR}/tiddlers`;

  // Rename template dir to upload dir
  await $`mv ${TEMPLATE_DIR} ${UPLOAD_DIR}`;

  console.log(`Template successfully created in '${UPLOAD_DIR}'`);
}
