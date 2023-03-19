/*\
title: fstartup.js
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
    try {
      globalThis.Fancybox = require('$:/plugins/oeyoews/tiddlywiki-fancybox/library/fancybox.min.js');
      Fancybox.Fancybox.defaults = {
        ...Fancybox.defaults,
        ...options,
      };
      Fancybox.Fancybox.bind('[data-fancybox]', {
        wheel: 'close', // pan slide soom false
        startIndex: '0', // not work
        hideScrollbar: true,
      });
    } catch (r) {
      console.error(r);
    }
  },
};
