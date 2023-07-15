#!/usr/bin/env zx

import ora from 'ora';
import * as dotenv from 'dotenv';

dotenv.config();
$.verbose = false;

const buildDir = 'dist';
const log = ora('Building ...');

const cleanBuildDir = () => {
  $`rm -rf dist && mkdir dist`;
  log.succeed('🗑️ Clean dist directory');
};

const copyFiles = () => {
  $`cp -r files vercel.json ${buildDir}`;
  log.succeed('📁 copied files');
};

const steps = [
  { cmd: 'index', description: '📟 Build index' },
  { cmd: 'library', description: '📚 Build library' },
  { cmd: 'plugins', description: '🧩 Build plugins' },
  { cmd: 'themes', description: '🎨 Build themes' },
];

const buildStep = (name, description) => {
  log.start(description);
  $`npx tiddlywiki . --build ${name}`;
  log.succeed(description);
};

const buildAll = async () => {
  steps.map(step => {
    buildStep(step.cmd, step.description);
  });
};

const buildEditions = () => {
  $`npx tiddlywiki editions/neotw --build editions`;
  log.succeed('🚀 Build editions');
};

cleanBuildDir();
buildEditions();
await buildAll();
copyFiles();
