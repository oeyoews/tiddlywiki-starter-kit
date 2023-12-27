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
  const { version } = $tw.wiki.getTiddler(
    '$:/plugins/oeyoews/tiddlywiki-tailwindcss-plus'
  ).fields;
  window.tailwind = require('tailwindcss.min.js');
  window.tailwind.version = version;
  window.tailwind.config = require('./tailwind.config');
};
