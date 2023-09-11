import ora from 'ora';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import ci from 'ci-info';
// @ts-ignore
import tiged from 'tiged';
import { spawn } from 'bun';

/**
 * load env from .env file with bun
 */
const TIDDLERSREPO = process.env.TIDDLERSREPO || 'neotw-tiddlers';
const BUILDDIR = process.env.OUTPURDIR || '.tiddlywiki';
const log = ora('Building ...');

const emitter = tiged(TIDDLERSREPO, {
  disableCache: true,
  force: true,
  verbose: false,
});

/**
 * only clone tiddlers repo on ci environment
 */
function cloneTiddlers() {
  if (ci.isCI) {
    emitter.clone('tiddlers').then(() => {
      log.succeed(`tiddlers 文件夹复制完成(${ci.name})`);
    });
  }
}

/**
 * copy files folder, and verce.json file
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
