const { tmpdir } = require('node:os');
const path = require('path');

const name = 'TiddlyWiki5';
const logdir = path.join(tmpdir(), name);
console.log(`日志路径：${logdir}`);

module.exports = {
  // https://github.com/Unitech/pm2/blob/master/lib/API/schema.json
  apps: [
    {
      name,
      script: './lib/startup.mjs',
      // watch: ['./plugins', './themes'],
      ignore_watch: ['./tiddlers', '**/tiddlers', 'package/*'],
      max_memory_restart: '1024M', // 更多的情况是，tw 的浏览器实例卡死，而不是 server 端内存泄露，所以内存限制基本没用
      max_restarts: 3, // 似乎不生效
      exec_mode: 'cluster',
      // cron_restart: '0 0 * * *',
      cwd: './',
      watch_delay: 100,
      log_file: `${logdir}/logs/combined.outerr.log`,
      out_file: `${logdir}/logs/out.log`,
      err_file: `${logdir}/logs/err.log`,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // env:{}
    },
  ],
};
