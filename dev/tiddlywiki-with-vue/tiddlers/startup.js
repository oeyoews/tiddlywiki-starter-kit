/*\
title: $:/plugins/oeyoews/tiddlywiki-with-vue/startup.js
type: application/javascript
module-type: startup

load vue
\*/

exports.name = 'vue-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;

exports.startup = () => {
  const Vue = require('vue.global.js');
  // console.log(Vue);
};
