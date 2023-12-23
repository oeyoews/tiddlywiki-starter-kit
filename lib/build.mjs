#!/usr/bin/env node

// 构建需要
import 'dotenv/config';

import chalk from 'chalk';
import ora from 'ora';
import { spawn } from 'cross-spawn';
import { isCI, name as ciName } from 'ci-info';
import tiged from 'tiged';
import fs from 'fs-extra';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import { getRandomString } from 'randomstring-plus';
import config from '../config/index.js';

const OUTPUTDIR = config.output;
const buildId = getRandomString();

const log = ora(
  chalk.cyan(
    `Building(${buildId}) tiddlywiki on ${
      process.env.hasBun ? '🥟 Bun' : '📦 NodeJs'
    } and ${isCI ? ciName : 'Local'}`,
  ),
);

async function copyFiles() {
  // NOTE: fs-extra not support `cp files1 files2 target` link unix, 也不支持自动 `cp image test`, 必须加上 test/image
  fs.copySync('vercel.json', `${OUTPUTDIR}/vercel.json`);
  fs.copy('files', `${OUTPUTDIR}/files`).then(() => {
    log.succeed('files 等文件复制完成');
  });
}

const build = () => {
  generateTiddlyWikiInfo();
  spawn('tiddlywiki', ['--build']).on('close', () => {
    log.succeed(`构建完成 ${OUTPUTDIR} 文件夹.`);
    copyFiles();
  });
};

(function main() {
  log.start();

  const emitter = tiged(config.tiddlersRepo, {
    disableCache: true,
    force: true,
    verbose: false,
  });

  emitter.on('info', ({ message }) => {
    console.log('克隆状态:', message);
  });

  switch (ciName) {
    case 'Netlify CI':
    case 'Vercel':
      emitter.clone(`${config.wiki}/tiddlers`).then(() => {
        spawn('autocorrect', ['--fix']).on('close', () => {
          log.succeed('markdown 文件格式化完成');
          build();
        });
      });
      break;
    default:
      log.warn(
        chalk.red.bold(
          `检测到是${
            isCI ? ciName : '开发环境'
          }, 跳过此步骤(clone tiddlers), 开始构建`,
        ),
      );
      log.start();
      build();
  }
})();
