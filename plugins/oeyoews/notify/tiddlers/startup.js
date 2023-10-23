/*\
title: $:/plugins/oeyoews/notify/startup.js
type: application/javascript
module-type: startup

\*/
exports.name = 'notify-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const { Notify } = require('simple-notify.min.js');
  const defaultOptions = require('./options');

  $tw.rootWidget.addEventListener('om-notify', (event) => {
    const paramObject = event.paramObject || {};
    new Notify(Object.assign({}, defaultOptions, paramObject));
  });
};
