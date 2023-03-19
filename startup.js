// load environment variables
require('dotenv').config();

/* process.env.TIDDLYWIKI_PLUGIN_PATH = `./plugins`;
process.env.TIDDLYWIKI_THEME_PATH = `./themes`; */

// load tiddlywiki
var $tw = require('./node_modules/tiddlywiki/boot/boot.js').TiddlyWiki();

// pass the command line arguments to the boot kernel
$tw.boot.argv = Array.prototype.slice.call(process.argv, 2);

// boot the TW5 app
$tw.boot.boot();

// start the server, please execute this command on current directory
// node startup.js --listen
