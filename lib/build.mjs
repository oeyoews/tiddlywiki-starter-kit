#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import { spawn } from 'cross-spawn';
import dotenv from 'dotenv';
import { isCI, name as ciName } from 'ci-info';
import tiged from 'tiged';

dotenv.config();

const { TIDDLERSREPO, OUTPUTDIR } = process.env;
const hasBun = process.versions.bun;
const wikiLocation = process.env.wikiLocation;

const log = ora(
  chalk.cyan(
    `Building tiddlywiki on ${hasBun ? '🥟 bun' : '📦 nodejs'} and ${
      isCI ? ciName : ''
    }`,
  ),
);

function preset() {
  log.start();
  const emitter = tiged(TIDDLERSREPO, {
    disableCache: true,
    force: true,
    verbose: true,
  });

  emitter.on('info', ({ message }) => {
    console.log('克隆完成', message);
  });

  switch (ciName) {
    case 'Vercel':
      emitter.clone(`${wikiLocation}/tiddlers`).then(() => {});
      spawn('lint-md', ['**', '--fix']).on('close', () => {
        log.info('markdown 文件格式化完成');
      });
      break;
    default:
      log.info(
        `检测到是${
          isCI ? ciName : '开发环境'
        }, 跳过此步骤(clone tiddlers), 开始构建`,
      );
  }
}

function copyFiles() {
  spawn('cp', ['-r', 'files', 'vercel.json', OUTPUTDIR]).on('close', () => {
    log.succeed('files 等文件复制完成');
  });
}

const main = () => {
  generateTiddlyWikiInfo();
  // spawn('cp', ['dev', 'plugins/oeyoews']);
  // TODO: build empty.html and full.html
  // on windows, need use pnpm dlx instead of npx
  // pnpm dlx 会用到缓存
  spawn('tiddlywiki', ['--build'], { shell: true }).on('close', () => {
    log.succeed(`构建完成 ${OUTPUTDIR} 文件夹.`);
    isCI && copyFiles();
  });
};

preset();
main();
