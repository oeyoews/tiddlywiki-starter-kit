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
  $tw.rootWidget.addEventListener('om-notify', (event) => {
    const { paramObject = {} } = event;
    new $tw.Notify().display(paramObject);
  });
};
