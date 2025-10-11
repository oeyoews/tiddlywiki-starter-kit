/*\
title: $:/plugins/oeyoews/notify/options.js
type: application/javascript
module-type: library

\*/
module.exports = {
  status: 'success', // error, warning
  title: 'Notify Title',
  text: '',
  effect: 'fade', // slide, fade // NOTE: slide on safari will shrink
  speed: 300,
  customClass: null,
  customIcon: null,
  showIcon: true,
  showCloseButton: true,
  autoclose: true,
  autotimeout: 1500,
  gap: 20,
  distance: 20,
  type: 1, // 1, 2, 3
  position: 'right top' // top bottom center // left right
};
