/*\
title: $:/plugins/oeyoews/tiddlywiki-tailwindcss-v4/startup.js
type: application/javascript
module-type: startup

tailwindcss init
\*/

exports.name = 'tailwindcss-v4-startup-hook';
exports.platforms = ['browser'];
exports.before = ['render'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  require('tailwindcss-v4.min.js');
};
