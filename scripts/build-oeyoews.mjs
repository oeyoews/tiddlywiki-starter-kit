#!/usr/bin/env zx

import ora from 'ora';
import * as dotenv from 'dotenv';

// load env
dotenv.config();
// process.env.TIDDLYWIKI_PLUGIN_PATH = './';
// process.env.TIDDLYWIKI_THEME_PATH = './';

// impress msg
$.verbose = false;

/* const PUBLIC = process.env.PUBLIC || true;
if (!PUBLIC) {
  console.log('构建被禁用');
  return;
} */

const bin = 'tiddlywiki';
const dist = 'dist';
const oraSpinner = ora('Building ...');

// start
oraSpinner.start();

// clean generated files
await $`rm -rf ${dist}`;

// rss
await $`npx ${bin} --build feed`;

// library
await $`npx ${bin} --build library`;

/* edition */
// need dotenv to add library
await $`npx ${bin} editions/neotw --build editions`;

// build index
await $`npx ${bin} --build index`;
// build readable name plugins
await $`npx ${bin} --build plugins`;
/** notebook theme */
await $`npx ${bin} --build themes`;
// build empty
// await $`npx ${bin} --build neotw-empty`;

// build static
// await $`cp -r static-patch tiddlers/static-patch`;
// await $`npx ${bin} --build static`;
// await $`npx tiddlywiki --output dist --render '[!is[system]]' '[addprefix[static/]addsuffix[.html]]'`;
// await $`npx tiddlywiki  --output dist --rendertiddler "$:/core/templates/static.template.css" "static/static.css"`;
// await $`rm -rf tiddlers/static-patch`;
// move static to root
// await $`cp dist/static/* dist/`;

// minify index.html
await $`npx html-minifier-terser -c ./config/html-minifier-terser-config.json -o dist/index.html dist/index.html`;
// misc
await $`cp -r files vercel.json ${dist}`;
oraSpinner.succeed('Done');
