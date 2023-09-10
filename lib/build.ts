import ora from 'ora';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';

const buildDir = process.env.OUTPURDIR || '.tiddlywiki';
const log = ora('Building ...');

function copyFiles() {
  // @ts-ignore
  Bun.spawn(['cp', '-r', 'files', 'vercel.json', buildDir], {
    // @ts-ignore
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
