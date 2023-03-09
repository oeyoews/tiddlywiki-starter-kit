module.exports = {
  apps: [
    {
      name: 'neotw',
      script: './node_modules/tiddlywiki/tiddlywiki.js',
      args: '--build listen',
      watch: ['./dev/plugins/'],
      ignore_watch: [
        //不监视的文件
      ],
      cwd: './',
      watch_delay: 1000,
    },
  ],
};
