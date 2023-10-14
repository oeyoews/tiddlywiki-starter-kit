#!/usr/bin/env bun

import chalk from 'chalk';
import ora from 'ora';
import generateTiddlyWikiInfo from '@/tiddlywiki.config.mjs';
import {isCI, name as ciName } from 'ci-info';
import { spawn } from 'bun';

const env = process.env;
/** @description load env from .env file with bun */
const TIDDLERSREPO = env.TIDDLERSREPO || 'neotw-tiddlers';
const OUTPUTDIR = env.OUTPURDIR || '.tiddlywiki';
// 实际上可以直接写 import {isBun} from 'process', 但是如果安装了 @types/node 会有ts 警告
const hasBun = process.versions.bun;
const log = ora(
  chalk.cyan(`${isCI ? ciName : ''} ${hasBun ? '🥟' : '📦'} Building ...`),
);

/** @description only clone tiddlers repo on ci environment */
function cloneTiddlers(callback: () => void) {
  log.start();
  if (isCI) {
    spawn(['tiged', TIDDLERSREPO, 'tiddlers'], {
      onExit: (proc, exitCode, signalCode, error) => {
        if (exitCode === 0) {
          log.info(`tiddlers 文件夹复制完成`);
          callback();
        }
      },
    });
  } else {
    callback();
  }
}

/** @description copy files folder, and verce.json file */
function copyFiles() {
  spawn(['cp', '-r', 'files', 'vercel.json', OUTPUTDIR], {
    onExit: (proc, exitCode, signalCode, error) => {
      if (exitCode === 0) {
        log.succeed('复制文件完成');
      }
    },
  });
}

const main = () => {
  generateTiddlyWikiInfo();
  spawn(['npx', 'tiddlywiki', '--build'], {
    onExit: (proc, exitCode, signalCode, error) => {
      if (exitCode === 0) {
        log.succeed(`构建完成 ${OUTPUTDIR}`);
        copyFiles();
      }
    },
  });
};

cloneTiddlers(main);
