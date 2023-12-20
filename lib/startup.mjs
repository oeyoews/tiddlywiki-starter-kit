#!/usr/bin/env node

import checkFileSize from './checkFileSize.mjs';
import { TiddlyWiki } from 'tiddlywiki';
import 'dotenv/config';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import address from 'address';
import chalk from 'chalk';
import fs from 'fs';
import getPort from 'get-port';
import ora from 'ora';
import QRCode from 'qrcode';
import config from '../config/index.mjs';

/** @description: TiddlyWiki starter kit entry point */
async function main() {
  const spinner = ora('starting\n');
  spinner.start();
  // Load environment variables
  // Update tiddlywiki.info
  generateTiddlyWikiInfo();
  const { HOST } = process.env;
  // const SyncerLogger = Boolean(process.env.SyncerLogger);

  const port = await getPort({ port: [config.port, 8001, 8080, 8001] });
  const ip = address.ip();
  const enableQRCode = process.env.ENABLE_QRCODE === 'true';
  const wikiLocation = config.wiki;
  const unnormallFileSizes = await checkFileSize(wikiLocation);
  if (unnormallFileSizes) {
    process.exit(1);
  }

  const ipdata = `http://${ip}:${port}`;

  enableQRCode &&
    QRCode.toString(
      ipdata,
      {
        type: 'terminal',
        small: true,
      },
      function (_, url) {
        console.log(url);
      },
    );
  spinner.start();

  /** @type {import('tw5-typed').ITiddlyWiki} */
  const $tw = TiddlyWiki();
  const app = $tw.boot;

  app.argv = [
    '--listen',
    `port=${port}`,
    `host=${HOST}`,
    'root-tiddler=$:/core/save/all-external-js',
    'use-browser-cache=yes',
    `anon-username=${config.username}`, // NOTE: Windows11 defaults to an environment variable USERNAME=SYSTEM, 不建议使用系统username
    // 'username=oeyoews',
    // 'password=oeyoews',
  ];

  // Check if tiddlywiki.info does not exist in the wikiLocation directory, create and notify
  const infoFile = `${wikiLocation}/tiddlywiki.info`;

  const infoFileContent = {
    themes: ['tiddlywiki/vanilla'],
    plugins: ['tiddlywiki/filesystem', 'tiddlywiki/tiddlyweb'],
    config: {
      'retain-original-tiddler-path': true,
    },
  };
  if (!fs.existsSync(wikiLocation)) {
    console.log(
      chalk.yellow(
        `${wikiLocation} folder does not exist Created this folder.`,
      ),
    );
    fs.mkdirSync(wikiLocation);
  }
  if (!fs.existsSync(infoFile)) {
    fs.writeFileSync(infoFile, JSON.stringify(infoFileContent, null, 2));
    console.log(
      chalk.yellow(
        `tiddlywiki.info file does not exist in ${wikiLocation} directory. Created a new file.`,
      ),
    );
  }

  // load ip tiddler
  $tw.preloadTiddler({
    title: '$:/info/url/ip',
    text: ipdata,
  });

  const info = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  // TODO: 需要考虑到不是 git 仓库
  const commitId = info.dependencies.tiddlywiki.split('#')[1];

  $tw.preloadTiddler({
    title: '$:/info/prelease/version',
    text: `https://github.com/Jermolene/TiddlyWiki5/commit/${commitId}`,
    description: 'Tiddlywiki latest commit id',
  });

  // $tw.syncer.logger.enable = SyncerLogger;

  const succeedInfo = () => {
    spinner.succeed(chalk.green.bold('太微成功启动'));
  };

  app.boot(succeedInfo);
}

main();
