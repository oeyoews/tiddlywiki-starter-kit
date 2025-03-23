#!/usr/bin/env node
import config from '../config/index.mjs';
import generateTiddlyWikiInfo from './generateInfo.mjs';
import { checkFileSize, checkinfo, useId } from './utils/index.mjs';
import address from 'address';
import chalk from 'chalk';
import { exec } from 'child_process';
import { consola } from 'consola';
import 'dotenv/config';
import getPort from 'get-port';
// more than node18
// import open from 'open';
// import ora from 'ora';
import QRCode from 'qrcode';
import { TiddlyWiki } from 'tiddlywiki';

/** 本地启动 tw */
// preloadTiddlerArray
const { boot: app, preloadTiddler } = TiddlyWiki();

/** @description: TiddlyWiki starter kit entry point */
(async function main() {
  // consola.box('Welcom to TiddlyWiki Starter Kit(DEV)');
  // const spinner = ora('starting').start('Loading ...\n');

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
      // description: `当前太微实例(${useId})服务器 IP 地址 ` + ip,
      description: `Current TiddlyWiki Server (${useId})IP:` + ip,
    };

    String(ip).startsWith('192.168') && preloadTiddler(ipTiddler);
  }

  // $tw.syncer.logger.enable = SyncerLogger;

  const succeedInfo = async () => {
    if (config.server.zen) {
      console.clear();
    }
    // spinner.succeed();
    consola.success(chalk.green.bold(`[TiddlyWiki]: Succeed(${useId})`));

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
          consola.log(url); // show qrcode image
        },
      );
    }
    if (config.server.open) {
      // await open('http://localhost:' + port);

      const os = process.platform;
      const url = 'http://localhost:' + port;
      const open = {
        darwin: 'open',
        linux: 'xdg-open',
        win32: 'start',
      };
      consola.info(chalk.cyan.bold('[OS]:', os));

      exec(`${open[os]} ${url}`, (err) => {
        if (err) {
          consola.error(err);
        } else {
        }
      });
    }
  };

  app.boot(succeedInfo);
})();
