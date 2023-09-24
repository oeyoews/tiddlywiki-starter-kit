#!/usr/bin/env node

import dotenv from 'dotenv';
import { TiddlyWiki } from 'tiddlywiki';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import qrcode from 'qrcode-terminal';
import address from 'address';

const PORT = process.env.PORT || 8000;
const USERNAME = process.env.USERNAME || 'oeyoews';

const ip = address.ip();

qrcode.generate(`http://${ip}:${PORT}`, { small: true });

// load environment variables
dotenv.config();

const tw = TiddlyWiki().boot;

generateTiddlyWikiInfo();

const argv = [
  '--listen',
  `port=${PORT}`,
  'host=0.0.0.0',
  'root-tiddler=$:/core/save/all-external-js',
  'use-browser-cache=yes',
  `anon-username=${USERNAME}`,
];

// pass the command line arguments to the boot kernel
// tw.argv = [...process.argv.slice(2)];
tw.argv = argv;

// boot the TW5 app
tw.boot();

// start the server, please execute this command on current directory
// node startup.js --listen
