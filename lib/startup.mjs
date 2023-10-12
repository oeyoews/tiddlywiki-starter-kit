#!/usr/bin/env node

import { TiddlyWiki } from 'tiddlywiki';
import dotenv from 'dotenv';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import qrcode from 'qrcode-terminal';
import address from 'address';
import findPort from './findPort.mjs';
import chalk from 'chalk';

/** description： tiddlywiki starter kit 启动入口 */
async function main() {
  // load environment variables
  dotenv.config();
  // update tiddlywiki.info
  generateTiddlyWikiInfo();

  const { PORT, USERNAME } = process.env;

  const port = await findPort(PORT);
  const ip = address.ip();
  const enableQRCode = process.env.ENABLE_QRCODE === 'true';
  // generate qrcode 
  enableQRCode && qrcode.generate(`http://${ip}:${port}`, { small: true });

  if (port !== Number(PORT)) {
    console.log(
      chalk.red.bold(`${PORT} 端口被占用, 使用 ${chalk.green(port)} 端口代替`),
    );
  }

  const app = TiddlyWiki().boot;

  app.argv = [
    '--listen',
    `port=${port}`,
    'host=0.0.0.0',
    'root-tiddler=$:/core/save/all-external-js',
    'use-browser-cache=yes',
    `anon-username=${USERNAME}`, // NOTE: Windows11 默认是有一个username的环境变量 USERNAME=SYSTEM
  ];

  //  太微, 启动!!!  🚀
  app.boot();
}

main();
