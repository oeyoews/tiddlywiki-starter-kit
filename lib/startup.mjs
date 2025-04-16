#!/usr/bin/env node
import config from '../config/index.mjs';
import generateTiddlyWikiInfo from './generateInfo.mjs';
import { tiddlywiki } from './tiddlywiki.mjs';
import { getAllLocalIPv4Addresses } from './utils/getHost.mjs';
import { checkFileSize, checkinfo, useId } from './utils/index.mjs';
import createSymlink from './utils/symbollink.mjs';
import chalk from 'chalk';
import { exec } from 'child_process';
import { consola } from 'consola';
import 'dotenv/config';
import getPort from 'get-port';
import keypress from 'keypress';
import path from 'path';
// more than node18
// import open from 'open';
// import ora from 'ora';
import QRCode from 'qrcode';

let openPage;
let currentServer = null;

let __dirname = path.dirname(new URL(import.meta.url).pathname);
if (__dirname.startsWith('/')) {
  __dirname = __dirname.slice(1);
}

const os = process.platform;
const open = {
  darwin: 'open',
  linux: 'xdg-open',
  win32: 'start',
};
const rootiDir = path.join(__dirname, '..');
const rootSubwikiDir = path.join(rootiDir, 'subwiki');
const tiddlerSubwikiDir = path.join(
  // rootiDir,
  config.wiki,
  'tiddlers',
  'subwiki',
);

/** 本地启动 tw */
// preloadTiddlerArray
// const { boot: app, preloadTiddler } = TiddlyWiki();
/** @description: TiddlyWiki starter kit entry point */
async function main() {
  const id = useId();
  // consola.box('Welcom to TiddlyWiki Starter Kit(DEV)');
  // const spinner = ora('starting').start('Loading ...\n');

  const port = await getPort({ port: [config.server.port, 8001, 8080, 8081] });
  const { wiki: wikiLocation, checkfilesize } = config;

  // const SyncerLogger = Boolean(process.env.SyncerLogger);
  generateTiddlyWikiInfo();
  checkinfo();
  // TODO
  await createSymlink('subwiki', tiddlerSubwikiDir);

  if (checkfilesize) {
    const unnormallFileSizes = await checkFileSize(wikiLocation);
    if (unnormallFileSizes) {
      process.exit(1);
    }
  }

  // const ip = address.ip();
  const ip = getAllLocalIPv4Addresses().pop();
  const ipdata = `http://${ip}:${port}`;

  let args = config.startup({
    port,
  });
  let preloadTiddlers = [];

  if (config.server.host) {
    args.push('host=' + config.server.hostname);
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
      description: `Current TiddlyWiki Server (${id})IP:` + ip,
    };

    String(ip).startsWith('192.168') && preloadTiddlers.push(ipTiddler);
  }

  // $tw.syncer.logger.enable = SyncerLogger;

  openPage = () => {
    // await open('http://localhost:' + port);
    const url = 'http://localhost:' + port;
    consola.info(chalk.cyan.bold('[OS]:', os));

    exec(`${open[os]} ${url}`, (err) => {
      if (err) {
        consola.error(err);
      } else {
      }
    });
  };

  const succeedInfo = async () => {
    if (config.server.zen) {
      console.clear();
    }
    // spinner.succeed();
    consola.success(chalk.green.bold(`[TiddlyWiki]: Succeed(${id})`));

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
      openPage();
    }
  };

  tiddlywiki(args, preloadTiddlers, ($tw) => {
    $tw.hooks.addHook('th-server-command-post-start', (_, server) => {
      server.on('error', () => {
        consola.error('start failed(tiddlywiki)', id);
      });
      server.on('listening', succeedInfo);
      currentServer = server;
    });
  });
}

main();
// 监听键盘事件
keypress(process.stdin);
process.stdin.on('keypress', function (ch, key) {
  if (key && key.name == 'r') {
    consola.info(chalk.yellow.bold('Restarting TiddlyWiki...'));
    // currentServer.on('close', main);
    // currentServer.close();
    // currentServer &&
    //   currentServer.close(() => {
    //     main();
    //   });
    currentServer.close();
    main();
  }
  // 退出
  if (key && key.ctrl && key.name == 'c') {
    process.exit(0);
  }
  // 退出
  if (key && key.name == 'q') {
    process.exit(0);
  }
  // 打开网页
  if (key && key.name == 'o') {
    openPage();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
