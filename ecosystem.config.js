module.exports = {
  apps: [
    {
      name: 'neotw',
      script: './node_modules/tiddlywiki/tiddlywiki.js',
      args: '--build listen',
      watch: ['./plugins/'],
      ignore_watch: [],
      cwd: './',
      watch_delay: 100,
    },
  ],
};
