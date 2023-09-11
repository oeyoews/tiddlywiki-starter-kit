import dotenv from 'dotenv';
import { TiddlyWiki } from 'tiddlywiki';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';

// load environment variables
dotenv.config();

const tw = TiddlyWiki().boot;

generateTiddlyWikiInfo();

// pass the command line arguments to the boot kernel
tw.argv = [...process.argv.slice(2)];

// boot the TW5 app
tw.boot();

// start the server, please execute this command on current directory
// node startup.js --listen
