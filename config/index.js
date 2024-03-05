module.exports = {
  name: 'tiddlywiki-starter-kit',
  server: {
    port: 8000,
    host: true,
    hostname: '0.0.0.0',
    qrcode: true, // only host not false works
    zen: true,
    open: false // NOTE: pm2 or pm2 cron restart will open also
  },
  username: 'oeyoews',
  password: 'oeyoews',
  output: '.tiddlywiki',
  // debug: false,
  wiki: 'src',
  markdown: true,
  tiddlersRepo: 'oeyoews/neotw-tiddlers',
  pluginversion: '5.3.0',
  checkFileSize: false
};
