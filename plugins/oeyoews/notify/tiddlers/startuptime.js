/*\
title: $:/plugins/oeyoews/notify/startuptime.js
type: application/javascript
module-type: startup

startuptime
\*/
exports.name = 'notify-startuptime-hook';
exports.platforms = ['browser'];
exports.after = ['load-modules'];
exports.synchronous = true;
exports.startup = () => {
  try {
    const notifier = new $tw.Notify();
    const startTime = performance.now();

    window.addEventListener('load', () => {
      const loadTime = Math.floor(performance.now() - startTime);
      notifier.display({
        title: '启动时间',
        text: `本次启动耗时约 ${loadTime}ms`,
        autotimeout: 3000,
      });
    });
  } catch (e) {}
};
