module.exports = {
  name: 'tiddlywiki-starter-kit',
  server: {
    port: 8000,
    host: false,
    hostname: '0.0.0.0',
    qrcode: false, // only host not false works
    zen: false,
    open: false, // NOTE: pm2 or pm2 cron restart will open also
  },
  username: 'oeyoews',
  password: 'oeyoews',
  output: '.tiddlywiki',
  // debug: false,
  wiki: 'src',
  markdown: true,
  tiddlersRepo: 'oeyoews/neotw-tiddlers',
  pluginversion: '5.3.0',
  checkFileSize: false,
};
