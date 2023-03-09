module.exports = {
  apps: [
    {
      name: 'neotw',
      script: './node_modules/tiddlywiki/tiddlywiki.js',
      args: '--build listen',
      watch: ['./dev/plugins/'],
      cwd: './',
      watch_delay: 1000,
    },
  ],
};
