#!/usr/bin/env node

// 启动需要
import 'dotenv/config';

import open from 'open';
import { getRandomString } from 'randomstring-plus';
import checkFileSize from './checkFileSize.mjs';
import { TiddlyWiki } from 'tiddlywiki';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import address from 'address';
import chalk from 'chalk';
import fs from 'fs';
import getPort from 'get-port';
import ora from 'ora';
import QRCode from 'qrcode';
import config from '../config/index.js';

/** @description: TiddlyWiki starter kit entry point */
(async function main() {
  const spinner = ora('starting\n');
  spinner.start();
  // Load environment variables
  // Update tiddlywiki.info
  generateTiddlyWikiInfo();
  // const SyncerLogger = Boolean(process.env.SyncerLogger);

  const port = await getPort({ port: [config.server.port, 8001, 8080, 8081] });
  const wikiLocation = config.wiki;
  const unnormallFileSizes = await checkFileSize(wikiLocation);
  if (unnormallFileSizes) {
    process.exit(1);
  }

  const ip = address.ip();
  const ipdata = `http://${ip}:${port}`;

  spinner.start();

  /** @type {import('tw5-typed').ITiddlyWiki} */
  const $tw = TiddlyWiki();
  const app = $tw.boot;

  app.argv = [
    '--listen',
    'port=' + port,
    'root-tiddler=$:/core/save/all-external-js',
    'use-browser-cache=yes',
    'anon-username=' + config.username,
    // 'username='+config.username
    // 'password='+config.password
  ];

  if (config.server.host) {
    app.argv.push('host=' + config.server.host);
  }

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

  const startId = getRandomString();

  if (config.server.host) {
    /** @NOTE 如果你是在线服务器托管, 不会生成这个文件, 以防泄露 ip */
    String(ip).startsWith('192.168') &&
      $tw.preloadTiddler({
        title: '$:/info/url/ip',
        text: ipdata,
        description: `当前太微实例(${startId})服务器 IP 地址 ` + ip,
      });
  }

  // const info = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  // const commitId = info.dependencies.tiddlywiki.split('#')[1];
  // $tw.preloadTiddler({
  //   title: '$:/info/prelease/version',
  //   text: `https://github.com/Jermolene/TiddlyWiki5/commit/${commitId}`,
  //   description: 'Tiddlywiki latest commit id',
  // });

  // $tw.syncer.logger.enable = SyncerLogger;

  const addColor = (enableOption, color = 'green') =>
    chalk[color](enableOption);

  const succeedInfo = async () => {
    if (config.server.zen) {
      console.clear();
    }
    spinner.succeed(chalk.green.bold(`[太微启动]: 成功(${startId})`));

    const data = Object.assign({}, config, config.server);
    delete data.server;

    console.table([data]);
    if (config.server.host && config.server.qrcode) {
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
    }
    if (config.server.open) {
      await open('http://localhost:' + port);
    }
  };

  app.boot(succeedInfo);
})();
