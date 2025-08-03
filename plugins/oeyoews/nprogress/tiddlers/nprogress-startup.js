/*\
title: $:/plugins/oeyoews/nprogress/nprogress-startup.js
type: application/javascript
module-type: startup

nprogress module
\*/
exports.name = 'nprogress-startup-hook';
exports.platforms = ['browser'];
exports.after = ['load-modules'];
exports.synchronous = true;
exports.startup = () => {
  try {
    const progress = $tw.NProgress;
    const startTime = performance.now();

    progress.start();

    $tw.rootWidget.addEventListener('om-nprogress', (event) => {
      const { type } = event.paramObject || { type: 'start' };
      progress[type]();
    });

    $tw.rootWidget.addEventListener('om-nprogress-done', (event) => {
      const { type } = event.paramObject || { type: 'done' };
      progress[type]();
    });

    window.addEventListener('load', () => {
      progress.done();
      // $tw.Confetti.pretty();
      const loadTime = Math.floor(performance.now() - startTime);
      console.log(`🎉 Page loaded in ${loadTime}ms`);
    });
  } catch (e) {}
};
