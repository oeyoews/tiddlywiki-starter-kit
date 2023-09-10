// load environment variables
import dotenv from 'dotenv';
import { TiddlyWiki } from 'tiddlywiki';
import generateTiddlyWikiInfo from '../tiddlywiki.config.mjs';

dotenv.config();

const $tw = TiddlyWiki();

generateTiddlyWikiInfo();

// pass the command line arguments to the boot kernel
$tw.boot.argv = Array.prototype.slice.call(process.argv, 2);

// boot the TW5 app
$tw.boot.boot();

// start the server, please execute this command on current directory
// node startup.js --listen
