/*\
title: $:/plugins/oeyoews/neotw-menubar/startup.js
type: application/javascript
// module-type: startup

\*/
exports.platforms = ['browser'];
exports.after = ['render'];
exports.synchronous = true;
exports.startup = () => {
  const getNavigatorWidget = require('./getNavigatorWidget.js');
  window.getNavigatorWidget = getNavigatorWidget;
  getNavigatorWidget();
};
