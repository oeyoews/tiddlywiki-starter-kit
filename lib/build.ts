import ora from 'ora';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import ci from 'ci-info';
// @ts-ignore
import tiged from 'tiged';

const emitter = tiged('oeyoews/tiddlywiki-starter-kit', {
  disableCache: true,
  force: true,
  verbose: false,
});

if (ci.name === 'VERCEL' || ci.name === 'GITHUB_ACTIONS') {
  emitter.clone('tiddlers').then(() => {
    log.succeed('tiddlers 文件夹复制完成');
  });
}

const buildDir = process.env.OUTPURDIR || '.tiddlywiki';
const log = ora('Building ...');

function copyFiles() {
  Bun.spawn(['cp', '-r', 'files', 'vercel.json', buildDir], {
    onExit: (proc, exitCode, signalCode, error) => {
      if (exitCode === 0) {
        log.succeed('复制文件完成');
      }
    },
  });
}

const build = () => {
  log.start();
  generateTiddlyWikiInfo();
  Bun.spawn(['npx', 'tiddlywiki', '--build'], {
    onExit: (proc, exitCode, signalCode, error) => {
      if (exitCode === 0) {
        log.succeed(`构建完成 ${buildDir}`);
        copyFiles();
      }
    },
  });
};

build();
