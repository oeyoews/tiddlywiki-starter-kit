module.exports = {
  apps: [
    {
      name: 'tiddlywiki-starter-kit',
      script: './lib/startup.mjs',
      watch: ['./plugins', './themes'],
      max_memory_restart: '1024M',
      exec_mode: 'cluster',
      cron_restart: '0 */3 * * *',
      ignore_watch: ['./tiddlers'],
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
