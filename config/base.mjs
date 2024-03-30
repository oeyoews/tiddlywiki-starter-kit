export default {
  name: 'tiddlywiki-starter-kit',
  description:
    'A modern style and elegant notebook built with Tiddlywiki5 and Tailwindcss',
  server: {
    port: 8000,
    host: false,
    hostname: '0.0.0.0',
    qrcode: true, // only host not false works
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
  checkfilesize: false,
};
