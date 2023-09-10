import ora from 'ora';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import { spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const buildDir = process.env.OUTPUTDIR || '.tiddlywiki';
const log = ora('Building ...');

function copyFiles() {
  spawn('cp', ['-r', 'files', 'vercel.json', buildDir]).on('close', () => {
    log.succeed('复制完成');
  });
}

const build = () => {
  generateTiddlyWikiInfo();
  // @ts-ignore
  spawn('npx', ['tiddlywiki', '--build']).on('close', () => {
    log.succeed(`构建完成 ${buildDir}`);
    copyFiles();
  });
};

build();
