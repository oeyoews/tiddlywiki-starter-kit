/*\
title: $:/plugins/oeyoews/tiddlywiki-tailwindcss-plus/startup.js
type: application/javascript
module-type: startup

tailwindcss init
\*/

exports.name = 'tailwindcss-startup-hook';
exports.platforms = ['browser'];
exports.before = ['render'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  window.tailwind = require('tailwindcss.min.js');
  window.tailwind.config = require('./tailwind.config');
};
