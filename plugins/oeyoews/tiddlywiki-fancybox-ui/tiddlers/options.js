/*\
title: $:/plugins/oeyoews/tiddlywiki-fancybox-ui/options.js
type: application/javascript
module-type: library

\*/
module.exports = {
  // Toolbar: false,
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
        // 'slideshow', 'fullscreen', 'download', 'thumbs', 'close',
      ],
    },
    enabled: true,
  },
  Fullscreen: {
    autoStart: false,
  },
  Thumbs: {
    type: 'modern', // modern, classic
    showOnStart: true,
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
  Images: {
    initialSize: 'fit', // cover; fit;
  },
  Hash: false, // custom hash  https://fancyapps.com/fancybox/plugins/hash/
};
