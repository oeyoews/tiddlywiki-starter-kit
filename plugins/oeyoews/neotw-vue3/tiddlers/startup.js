/*\
title: $:/plugins/oeyoews/neotw-vue3/startup.js
type: application/javascript
// module-type: startup

\*/

exports.name = 'vue3-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const Vue = require('./vue.global.prod.js');
  window.Vue = Vue;
};
