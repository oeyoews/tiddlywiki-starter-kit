#!/usr/bin/env node

import { TiddlyWiki } from 'tiddlywiki';
import dotenv from 'dotenv';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';
import qrcode from 'qrcode-terminal';
import address from 'address';

// load environment variables
dotenv.config();
// update tiddlywiki.info
generateTiddlyWikiInfo();

const { PORT, USERNAME } = process.env;

const ip = address.ip();

qrcode.generate(`http://${ip}:${PORT}`, { small: true });

const app = TiddlyWiki().boot;

const argv = [
  '--listen',
  `port=${PORT}`,
  'host=0.0.0.0',
  'root-tiddler=$:/core/save/all-external-js',
  'use-browser-cache=yes',
  `anon-username=${USERNAME}`,
];

app.argv = argv;

app.boot();
