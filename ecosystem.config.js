module.exports = {
  // https://github.com/Unitech/pm2/blob/master/lib/API/schema.json
  apps: [
    {
      name: 'tiddlywiki-starter-kit',
      script: './lib/startup.mjs',
      watch: ['./plugins', './themes'],
      ignore_watch: ['./tiddlers', '**/tiddlers'],
      max_memory_restart: '1024M', // 更多的情况是，tw的浏览器实例卡死，而不是server端内存泄露，所以内存限制基本没用
      max_restarts: 3,
      exec_mode: 'cluster',
      cron_restart: '0 */8 * * *',
      cwd: './',
      watch_delay: 100,
      log_file: './.logs/combined.outerr.log',
      out_file: './.logs/out.log',
      err_file: './.logs/err.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // env:{}
    },
  ],
};
