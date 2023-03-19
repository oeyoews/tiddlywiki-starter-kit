/*\
title: $:/plugins/oeyoews/tiddlywiki-fancybox/init-fancybox.js
type: application/javascript
version: 5.0.7

init fancybox setup
\*/

const options = {
  Fullscreen: {
    autoStart: false,
  },
  Thumbs: {
    autoStart: true,
    key: 'f',
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

Fancybox.defaults = {
  ...Fancybox.defaults,
  ...options,
  // Toolbar: {
  //   display: [
  //     { id: 'prev', position: 'center' },
  //     { id: 'counter', position: 'center' },
  //     { id: 'next', position: 'center' },
  //     'zoom',
  //     'slideshow',
  //     'fullscreen',
  //     'download',
  //     'thumbs',
  //     'close',
  //   ],
  // },
};

// document.addEventListener('DOMContentLoaded', function () {
Fancybox.bind('[data-fancybox]', {
  wheel: 'close', // pan slide soom false
  startIndex: '0', // not work
  hideScrollbar: true,
});
// });
