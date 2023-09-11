#!/usr/bin/env bun

import ora from 'ora';
import generateTiddlyWikiInfo from '@/tiddlywiki.config.mjs';
import ci from 'ci-info';
// @ts-ignore
import tiged from 'tiged';
import { spawn } from 'bun';

/**
 * @description load env from .env file with bun
 */
const TIDDLERSREPO = process.env.TIDDLERSREPO || 'neotw-tiddlers';
const BUILDDIR = process.env.OUTPURDIR || '.tiddlywiki';
// 实际上可以直接写 import {isBun} from 'process', 但是如果安装了 @types/node 会有ts 警告
const hasBun = process.versions.bun;
const log = ora(`${hasBun ? '🥟' : '📦'} Building ...`);

const emitter = tiged(TIDDLERSREPO, {
  disableCache: true,
  force: true,
  verbose: false,
});

/**
 * @description only clone tiddlers repo on ci environment
 */
function cloneTiddlers() {
  if (ci.isCI) {
    emitter.on((info: string) => {
      log.info(info);
    });
    emitter.clone('tiddlers').then(() => {
      log.info(`tiddlers 文件夹复制完成(${ci.name})`);
    });
  }
}

/**
 * @description copy files folder, and verce.json file
 */
function copyFiles() {
  spawn(['cp', '-r', 'files', 'vercel.json', BUILDDIR], {
    onExit: (proc, exitCode, signalCode, error) => {
      if (exitCode === 0) {
        log.succeed('复制文件完成');
      }
    },
  });
}

const main = () => {
  log.start();
  generateTiddlyWikiInfo();
  cloneTiddlers();
  spawn(['npx', 'tiddlywiki', '--build'], {
    onExit: (proc, exitCode, signalCode, error) => {
      if (exitCode === 0) {
        log.succeed(`构建完成 ${BUILDDIR}`);
        copyFiles();
      }
    },
  });
};

main();
