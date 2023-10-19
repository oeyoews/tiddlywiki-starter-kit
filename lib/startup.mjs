#!/usr/bin/env node

import { TiddlyWiki } from 'tiddlywiki';
import dotenv from 'dotenv';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import qrcode from 'qrcode-terminal';
import address from 'address';
import findPort from './findPort.mjs';
import chalk from 'chalk';
import fs from 'fs';
import getPort from 'get-port';

/** Description: TiddlyWiki starter kit entry point */
async function main() {
  // Load environment variables
  dotenv.config();
  // Update tiddlywiki.info
  generateTiddlyWikiInfo();

  const { PORT, USERNAME } = process.env;

  // const port = await findPort(PORT);
  const port = await getPort({ port: [8000, 8001, 8080, 8001] });
  const ip = address.ip();
  const enableQRCode = process.env.ENABLE_QRCODE === 'true';
  const wikiLocation = process.env.wikiLocation;

  // Generate QR code
  enableQRCode && qrcode.generate(`http://${ip}:${port}`, { small: true });

  if (port !== Number(PORT)) {
    console.log(
      chalk.red.bold(
        `${PORT} port is in use, using ${chalk.green(port)} port instead`,
      ),
    );
  }

  const app = TiddlyWiki().boot;

  app.argv = [
    '--listen',
    `port=${port}`,
    'host=0.0.0.0',
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

  // Start TiddlyWiki
  app.boot();
}

main();
