import ora from 'ora';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import fs from 'fs';

dotenv.config();

const buildDir = '.tiddlywiki';
const log = ora('Building ...');

const cleanBuildDir = () => {
  fs.rmSync(buildDir, { recursive: true, force: true });
  fs.mkdirSync(buildDir, { recursive: true });
};

const steps = [
  { cmd: 'index', description: '📟 构建索引' },
  { cmd: 'library', description: '📚 构建库' },
  { cmd: 'plugins', description: '🧩 构建插件' },
  { cmd: 'themes', description: '🎨 构建主题' },
];

const buildStep = (name: string, description: string) => {
  log.start(description);
  exec(`npx tiddlywiki . --build ${name}`, () => {
    log.info(description);
  });
};

const buildAll = () => {
  steps.forEach((step) => {
    buildStep(step.cmd, step.description);
  });
};

const copyFiles = () => {
  log.info('📁 复制文件');
  exec(`cp -r files vercel.json ${buildDir}`);
};

async function build() {
  generateTiddlyWikiInfo();
  cleanBuildDir();
  buildAll();
  copyFiles();
}

build();
