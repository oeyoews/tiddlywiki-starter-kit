// import .env
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'neotw',
      script: './node_modules/tiddlywiki/tiddlywiki.js',
      args: '--build listen',
      watch: ['./plugins/oeyoews', './themes', 'tiddlywiki.info', 'README.md'],
      ignore_watch: ['./tiddlers'],
      cwd: './',
      watch_delay: 100,
      log_file: './logs/combined.outerr.log',
      out_file: './logs/out.log',
      err_file: './logs/err.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // env: {
      //   TIDDLYWIKI_PLUGIN_PATH: './plugins',
      //   TIDDLYWIKI_THEME_PATH: './themes',
      // },
    },
  ],
};
