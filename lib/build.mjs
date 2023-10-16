#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import { spawn } from 'cross-spawn';
import dotenv from 'dotenv';
import { isCI, name as ciName } from 'ci-info';

dotenv.config();

const { TIDDLERSREPO, OUTPUTDIR } = process.env;
const hasBun = process.versions.bun;

const log = ora(
  chalk.cyan(`${isCI ? ciName : ''} ${hasBun ? '🥟' : '📦'} Building ...`),
);

function cloneTiddlers(callback) {
  log.start();
  if (isCI) {
    spawn('tiged', [TIDDLERSREPO, 'tiddlers'], { shell: true }).on(
      'close',
      () => {
        log.info(`tiddlers 文件夹复制完成(${ciName})`);
        callback();
      },
    );
  } else {
    callback();
  }
}

function copyFiles() {
  // cp and spawn on windows cannot use , need some npm package instead
  spawn('copyfiles', ['files', 'vercel.json', OUTPUTDIR], { shell: true }).on(
    'close',
    () => {
      log.succeed('复制完成');
    },
  );
}

const main = () => {
  generateTiddlyWikiInfo();
  // spawn('cp', ['dev', 'plugins/oeyoews']);
  // TODO: build empty.html and full.html
  // on windows, need use pnpm dlx instead of npx
  // pnpm dlx 会用到缓存
  spawn('pnpm', ['tiddlywiki', '--build'], { shell: true }).on('close', () => {
    log.succeed(`构建完成 ${OUTPUTDIR}`);
    // copyFiles();
  });
};

cloneTiddlers(main);
