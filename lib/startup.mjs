#!/usr/bin/env node
import address from 'address';
import chalk from 'chalk';
import 'dotenv/config';
import getPort from 'get-port';
import open from 'open';
import ora from 'ora';
import QRCode from 'qrcode';
import { TiddlyWiki } from 'tiddlywiki';
import config from '../config/index.mjs';
import generateTiddlyWikiInfo from './generateInfo.mjs';
import { useId, checkinfo, checkFileSize } from './utils/index.mjs';

// preloadTiddlerArray
const { boot: app, preloadTiddler } = TiddlyWiki();

/** @description: TiddlyWiki starter kit entry point */
(async function main() {
  const spinner = ora('starting\n');
  spinner.start();

  const port = await getPort({ port: [config.server.port, 8001, 8080, 8081] });
  const { wiki: wikiLocation, checkfilesize } = config;

  // const SyncerLogger = Boolean(process.env.SyncerLogger);
  generateTiddlyWikiInfo();
  checkinfo();

  if (checkfilesize) {
    const unnormallFileSizes = await checkFileSize(wikiLocation);
    if (unnormallFileSizes) {
      process.exit(1);
    }
  }

  const ip = address.ip();
  const ipdata = `http://${ip}:${port}`;

  spinner.start();

  app.argv = config.startup({
    port,
  });

  if (config.server.host) {
    app.argv.push('host=' + config.server.hostname);
  }

  // preloadTiddler({
  //   title: '$:/config/tiddlyweb/host',
  //   text: `$protocol$//$host$/src`,
  // });

  if (config.server.host) {
    const ipTiddler = {
      title: '$:/info/url/ip',
      text: ipdata,
      description: `当前太微实例(${useId})服务器 IP 地址 ` + ip,
    };

    String(ip).startsWith('192.168') && preloadTiddler(ipTiddler);
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
