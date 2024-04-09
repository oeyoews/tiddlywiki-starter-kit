#!/usr/bin/env node

// 构建需要
import 'dotenv/config';

import minifyFilesRecursively from './minify.js';
import chalk from 'chalk';
import ora from 'ora';
import { spawn } from 'cross-spawn';
import { isCI, name as ciName } from 'ci-info';
import tiged from 'tiged';
import fs from 'fs-extra';
import generateTiddlyWikiInfo from './generateInfo.mjs';
import config from '../config/index.mjs';
import genSidebar from './genSidebar.mjs';
import useId from './utils/useId.mjs';
import checkinfo from './utils/checkinfo.mjs';

const OUTPUTDIR = config.output;

const log = ora(
  chalk.cyan(
    `Building(${useId}) tiddlywiki on ${
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

const build = async () => {
  await minifyFilesRecursively();
  genSidebar();
  generateTiddlyWikiInfo();

  const child = spawn('tiddlywiki', ['--build'], {
    stdio: ['pipe', 'pipe', 'pipe', 'pipe', 'pipe', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (data) => {
    console.log(`\nstdout: ${data}`);
  });

  child.on('close', () => {
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
    case 'GitHub Actions':
    case 'GitLab CI':
      fs.rmSync('.gitignore'); // to support autocorrect to format
      emitter.clone(`${config.wiki}`).then(() => {
        // CRLF 会导致格式化卡住???
        // console.log('开始格式化文件');
        // https://github.com/huacnlee/autocorrect/tree/main/autocorrect-node
        // spawn('pnpm', ['autocorrect', '--fix']).on('close', () => {
        //   log.succeed('markdown 文件格式化完成');
        //   process.exit(0);
        // });
        build();
      });
      break;
    default:
      checkinfo();
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
