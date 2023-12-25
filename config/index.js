module.exports = {
  name: 'tiddlywiki-starter-kit',
  server: {
    port: 8000,
    // host: '0.0.0.0',
    host: false,
    qrcode: true, // only host not false works
    open: true, // NOTE: pm2 or pm2 cron restart will open also
  },
  username: 'oeyoews',
  password: 'oeyoews',
  output: '.tiddlywiki',
  wiki: 'src',
  // wiki: 'src-dev',
  markdown: true,
  tiddlersRepo: 'oeyoews/neotw-tiddlers',
  pluginversion: '5.3.0',
};
