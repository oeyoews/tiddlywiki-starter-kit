/*\
title: $:/plugins/{{ plugin_author }}/{{ pluginname }}/startup.js
type: application/javascript
module-type: startup

{{ pluginname }} startup

\*/

exports.name = '{{ pluginname }}-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  // your code here
  console.log('{{ pluginname }}-startup-hook');
};
