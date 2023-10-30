#!/usr/bin/env node

import { TiddlyWiki } from 'tiddlywiki';
import dotenv from 'dotenv';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import address from 'address';
import chalk from 'chalk';
import fs from 'fs';
import getPort from 'get-port';
import ora from 'ora';
import QRCode from 'qrcode';

dotenv.config();
/** Description: TiddlyWiki starter kit entry point */
async function main() {
  const spinner = ora('starting\n');
  spinner.start();
  // Load environment variables
  // Update tiddlywiki.info
  generateTiddlyWikiInfo();
  const { PORT, USERNAME, HOST } = process.env;

  const port = await getPort({ port: [8000, 8001, 8080, 8001] });
  const ip = address.ip();
  const enableQRCode = process.env.ENABLE_QRCODE === 'true';
  const wikiLocation = process.env.wikiLocation;

  if (port !== Number(PORT)) {
    spinner.warn(
      chalk.red.bold(
        `${PORT} port is in use, using ${chalk.green.underline.bold(
          port,
        )} port instead.`,
      ),
    );
    spinner.info(
      chalk.cyan.bold(
        'and you can scan the below qrcode on your phone to browser tiddlywiki.',
      ),
    );
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

  const $tw = TiddlyWiki();
  const app = $tw.boot;

  app.argv = [
    '--listen',
    `port=${port}`,
    `host=${HOST}`,
    'root-tiddler=$:/core/save/all-external-js',
    'use-browser-cache=yes',
    `anon-username=${USERNAME}`, // NOTE: Windows11 defaults to an environment variable USERNAME=SYSTEM
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

  app.boot(() => {
    spinner.succeed(chalk.green.bold('太微成功启动'));
  });
}

main();
