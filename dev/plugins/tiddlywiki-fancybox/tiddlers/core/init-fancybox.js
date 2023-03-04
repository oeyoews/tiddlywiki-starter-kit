Fancybox.defaults.Toolbar = {
  display: [
    { id: 'prev', position: 'center' },
    { id: 'counter', position: 'center' },
    { id: 'next', position: 'center' },
    'zoom',
    'slideshow',
    'fullscreen',
    'download',
    'thumbs',
    'close',
  ],
};
Fancybox.defaults.fullscreen = {
  autoStart: false,
};
Fancybox.defaults.Thumbs = {
  autoStart: true,
  key: 'f',
};
Fancybox.defaults.keyboard = {
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
};
Fancybox.defaults.Image = { zoom: false, wheel: 'close' };
Fancybox.defaults.Hash = false;
Fancybox.defaults.hideScrollbar = false;
