/*\
title: $:/plugins/oeyoews/neotw-graph/startup.js
type: application/javascript
module-type: startup

neotw-graph startup

\*/

exports.name = 'neotw-graph-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const ForceGraph3D = require('./3d-force-graph.min.js');
  window.ForceGraph3D = ForceGraph3D;
};
