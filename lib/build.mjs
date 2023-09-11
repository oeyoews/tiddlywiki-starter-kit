#!/usr/bin/env node

import ora from 'ora';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import { spawn } from 'child_process';
import dotenv from 'dotenv';
import tiged from 'tiged';
import ci from 'ci-info';

dotenv.config();

const TIDDLERSREPO = process.env.TIDDLERSREPO || 'neotw-tiddlers';
const BUILDDIR = process.env.OUTPUTDIR || '.tiddlywiki';
const hasBun = process.versions.bun;
const log = ora(`${hasBun ? '🥟' : '📦'} Building ...`);

const emitter = tiged(TIDDLERSREPO, {
  disableCache: true,
  force: true,
  verbose: false,
});

function cloneTiddlers(callback) {
  log.start();
  if (ci.isCI) {
    emitter.clone('tiddlers').then(() => {
      log.info(`tiddlers 文件夹复制完成(${ci.name})`);
      callback();
    });
  } else {
    callback();
  }
}

function copyFiles() {
  spawn('cp', ['-r', 'files', 'vercel.json', BUILDDIR]).on('close', () => {
    log.succeed('复制完成');
  });
}

const main = () => {
  generateTiddlyWikiInfo();
  spawn('npx', ['tiddlywiki', '--build']).on('close', () => {
    log.succeed(`构建完成 ${BUILDDIR}`);
    copyFiles();
  });
};

cloneTiddlers(main);
