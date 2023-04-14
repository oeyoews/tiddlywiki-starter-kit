module.exports = {
  Toolbar: {
    display: {
      left: ['infobar'],
      middle: [],
      right: ['slideshow', 'fullscreen', 'download', 'thumbs', 'close'],
    },
  },
  Fullscreen: {
    autoStart: false,
  },
  Thumbs: {
    autoStart: true,
    key: 'o',
  },
  keyboard: {
    Delete: 'close',
    Escape: 'close',
    ['q']: 'close',
    Backspace: 'close',
    PageUp: 'next',
    PageDown: 'prev',
    ['k']: 'prev',
    ['p']: 'prev',
    ArrowUp: 'next',
    ['j']: 'next',
    ['n']: 'next',
    ArrowDown: 'prev',
    ArrowRight: 'next',
    ArrowLeft: 'prev',
  },
  Image: {
    zoom: true,
    wheel: 'close',
  },
  Hash: false,
};
