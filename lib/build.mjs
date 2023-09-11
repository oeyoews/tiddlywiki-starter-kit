import ora from 'ora';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import { spawn } from 'child_process';
import dotenv from 'dotenv';
import tiged from 'tiged';
import ci from 'ci-info';

const TIDDLERSREPO = process.env.TIDDLERSREPO || 'neotw-tiddlers';

const emitter = tiged(TIDDLERSREPO, {
  disableCache: true,
  force: true,
  verbose: false,
});

function cloneTiddlers() {
  if (ci.VERCEL || ci.GITHUB_ACTIONS) {
    emitter.clone('tiddlers').then(() => {
      log.succeed('tiddlers 文件夹复制完成');
    });
  }
}

dotenv.config();

const buildDir = process.env.OUTPUTDIR || '.tiddlywiki';
const log = ora('Building ...');

function copyFiles() {
  spawn('cp', ['-r', 'files', 'vercel.json', buildDir]).on('close', () => {
    log.succeed('复制完成');
  });
}

const build = () => {
  log.start();
  generateTiddlyWikiInfo();
  cloneTiddlers();
  // @ts-ignore
  spawn('npx', ['tiddlywiki', '--build']).on('close', () => {
    log.succeed(`构建完成 ${buildDir}`);
    copyFiles();
  });
};

build();
