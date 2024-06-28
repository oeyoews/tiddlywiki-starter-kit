/** @type import ('./types.d.mjs').ConfigOptions */
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
  // wiki: 'src-dev',
  markdown: true,
  tiddlersRepo: 'oeyoews/neotw-tiddlers',
  /** 插件模板 tiddlywiki 版本要求 */
  pluginversion: '5.3.0',
  checkfilesize: false,
};
