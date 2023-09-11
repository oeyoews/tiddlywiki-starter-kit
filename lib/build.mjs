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
      // should add exit, but vercel is normal
      // 使用bun构建, cloneTiddlers 就很正常(github actions), 使用node, 就需要确保cloneTiddlers执行完毕(vercel)(否则会失去tiddlers的插件json, 但是普通条目没有缺少, 每次都一样), 很怪, 此处浪费时间N小时, 是网速问题吗?
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
