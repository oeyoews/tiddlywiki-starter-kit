// import .env
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'neotw',
      script: './node_modules/tiddlywiki/tiddlywiki.js',
      args: '--build listen',
      watch: ['./plugins/oeyoews', './themes'],
      ignore_watch: ['./tiddlers'],
      cwd: './',
      watch_delay: 100,
    },
  ],
};
