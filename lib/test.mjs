import tiged from 'tiged';

const emitter = tiged('oeyoews/oeyoews', {
  disableCache: false,
  force: false,
  verbose: true,
});

emitter.on('info', (info) => {
  console.log(info.message);
});

emitter.clone('test/hi');
