module.exports = {
  Toolbar: {
    display: {
      left: ['infobar'],
      middle: [
        /* 'zoomIn',
        'zoomOut',
        'toggle1to1',
        'rotateCCW',
        'rotateCW',
        'flipX',
        'flipY', */
      ],
      right: [
        // 'slideshow', 'fullscreen', 'download', 'thumbs', 'close'
      ],
    },
  },
  Fullscreen: {
    autoStart: false,
  },
  Thumbs: {
    type: 'modern', // modern, classic
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
    zoom: false,
    wheel: 'close',
  },
  Hash: false,
};
