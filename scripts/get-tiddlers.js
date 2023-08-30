const degit = require('tiged');

const emitter = degit('oeyoews/neotw-tiddlers', {
  cache: true,
  force: true,
  verbose: true,
});

emitter.on('info', info => {
  console.log(info.message);
});

emitter.clone('tiddlers_bk').then(() => {
  console.log('done');
});