/*\
title: $:/plugins/oeyoews/neotw-vue3/createPluginTemplate.js
type: application/javascript
module-type: library

\*/
const getTemplate = require('./getTemplate');
function createPluginTemplate(basePlugin = '') {
  const filepath = ['$:/plugins', basePlugin, 'templates'].join('/');
  return (file) => getTemplate(filepath + '/' + file);
}
module.exports = { createPluginTemplate };
