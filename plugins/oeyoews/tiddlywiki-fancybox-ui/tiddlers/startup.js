/*\
title: $:/plugins/oeyoews/tiddlywiki-fancybox-ui/startup.js
type: application/javascript
module-type: startup

fqncybox
\*/

'use strict';
module.exports = {
  ...module.exports,
  name: 'fancybox-startup-hook',
  platforms: ['browser'],
  after: ['load-modules'],
  synchronous: !0,
  startup: () => {
    const options = {
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
    try {
      const {
        Fancybox,
      } = require('$:/plugins/oeyoews/tiddlywiki-fancybox/library/fancybox.min.js');
      globalThis.Fancybox = Fancybox;
      Fancybox.defaults = {
        ...Fancybox.defaults,
        ...options,
      };
      Fancybox.bind('[data-fancybox]', {
        wheel: 'close', // pan slide soom false
        startIndex: '0', // not work
        hideScrollbar: true,
      });
    } catch (r) {
      console.error(r);
    }
  },
};
