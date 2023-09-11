import ora from 'ora';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import { spawn } from 'child_process';
import dotenv from 'dotenv';
import tiged from 'tiged';
import ci from 'ci-info';

dotenv.config();

const TIDDLERSREPO = process.env.TIDDLERSREPO || 'neotw-tiddlers';
const BUILDDIR = process.env.OUTPUTDIR || '.tiddlywiki';
const log = ora('Building ...');

const emitter = tiged(TIDDLERSREPO, {
  disableCache: true,
  force: true,
  verbose: false,
});

function cloneTiddlers() {
  if (ci.isCI) {
    // 如果tiddler文件夹存在, 如何处理(tiddler 一般是被忽略上传的)
    emitter.clone('tiddlers').then(() => {
      log.succeed(`tiddlers 文件夹复制完成(${ci.name})`);
    });
  }
}

function copyFiles() {
  spawn('cp', ['-r', 'files', 'vercel.json', BUILDDIR]).on('close', () => {
    log.succeed('复制完成');
  });
}

const main = () => {
  log.start();
  generateTiddlyWikiInfo();
  cloneTiddlers();
  spawn('npx', ['tiddlywiki', '--build']).on('close', () => {
    log.succeed(`构建完成 ${BUILDDIR}`);
    copyFiles();
  });
};

main();
