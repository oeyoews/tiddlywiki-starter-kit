#!/usr/bin/env node

import 'dotenv/config';
import open from 'open';
import checkFileSize from './utils/checkFileSize.mjs';
import { TiddlyWiki } from 'tiddlywiki';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import address from 'address';
import chalk from 'chalk';
import fs from 'fs';
import getPort from 'get-port';
import ora from 'ora';
import QRCode from 'qrcode';
import config from '../config/index.mjs';
import useId from './utils/useId.mjs';

const { boot: app, preloadTiddler } = TiddlyWiki();

/** @description: TiddlyWiki starter kit entry point */
(async function main() {
  const spinner = ora('starting\n');
  spinner.start();

  generateTiddlyWikiInfo();
  // const SyncerLogger = Boolean(process.env.SyncerLogger);

  const port = await getPort({ port: [config.server.port, 8001, 8080, 8081] });
  const { wiki: wikiLocation, info, checkfilesize } = config;

  if (checkfilesize) {
    const unnormallFileSizes = await checkFileSize(wikiLocation);
    if (unnormallFileSizes) {
      process.exit(1);
    }
  }

  const ip = address.ip();
  const ipdata = `http://${ip}:${port}`;

  spinner.start();

  app.argv = [
    '--listen',
    'port=' + port,
    'root-tiddler=$:/core/save/all-external-js',
    'use-browser-cache=yes',
    'anon-username=' + config.username,
    // 'username=' + config.username,
    // 'password=' + config.password
  ];

  if (config.server.host) {
    app.argv.push('host=' + config.server.hostname);
  }

  // Check if tiddlywiki.info does not exist in the wikiLocation directory, create and notify
  const infoFile = `${wikiLocation}/tiddlywiki.info`;

  if (!fs.existsSync(wikiLocation)) {
    console.log(
      chalk.yellow(
        `${wikiLocation} folder does not exist Created this folder.`,
      ),
    );
    fs.mkdirSync(wikiLocation);
  }
  if (!fs.existsSync(infoFile)) {
    fs.writeFileSync(infoFile, JSON.stringify(info, null, 2));
    console.log(
      chalk.yellow(
        `tiddlywiki.info file does not exist in ${wikiLocation} directory. Created a new file.`,
      ),
    );
  }

  if (config.server.host) {
    String(ip).startsWith('192.168') &&
      preloadTiddler({
        title: '$:/info/url/ip',
        text: ipdata,
        description: `当前太微实例(${useId})服务器 IP 地址 ` + ip,
      });
  }

  // $tw.syncer.logger.enable = SyncerLogger;

  const succeedInfo = async () => {
    if (config.server.zen) {
      console.clear();
    }
    spinner.succeed(chalk.green.bold(`[太微启动]: 成功(${useId})`));

    const data = Object.assign({}, config, config.server);
    delete data.server;

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
