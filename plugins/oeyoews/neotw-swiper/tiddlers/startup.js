/*\
title: $:/plugins/oeyoews/neotw-swiper/startup.js
type: application/javascript
module-type: startup

\*/
exports.name = 'swiper-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  require('./swiper-element-bundle.min.js');
};
