#!/usr/bin/env zx

import ora from 'ora';
import * as dotenv from 'dotenv';

dotenv.config();

const tiddlyWikiBin = 'tiddlywiki';
const buildDir = 'dist';
const oraSpinner = ora('Building ...');

const cleanBuildDir = () => $`rm -rf ${buildDir}`;

const buildLibrary = () => $`npx ${tiddlyWikiBin} --build library`;
const buildEditions = () =>
  $`npx ${tiddlyWikiBin} editions/neotw --build editions`;
const buildIndex = () => $`npx ${tiddlyWikiBin} --build index`;
const buildPlugins = () => $`npx ${tiddlyWikiBin} --build plugins`;
const buildThemes = () => $`npx ${tiddlyWikiBin} --build themes`;

const copyFiles = () => $`cp -r files vercel.json ${buildDir}`;
const minifyIndexHtml = () =>
  $`npx html-minifier-terser -c ./config/html-minifier-terser-config.json -o dist/index.html dist/index.html`;

const build = async () => {
  oraSpinner.start();
  await cleanBuildDir();
  await Promise.all([
    buildLibrary(),
    buildEditions(),
    buildIndex(),
    buildPlugins(),
    buildThemes(),
  ]);
  await copyFiles();
  await minifyIndexHtml();
  oraSpinner.succeed('Done');
};

build();
