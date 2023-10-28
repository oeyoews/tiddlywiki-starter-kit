/*\
title: nprogress-startup.js
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
    const progress = new $tw.NProgress();
    progress.start();
    const startTime = performance.now();

    /*
      <$button message="om-nprogress">
      start
      </$button >

      <$button >
        <$action-sendmessage $message="om-nprogress" type="start" />
        start
      </$button>
       */
    $tw.rootWidget.addEventListener('om-nprogress', (event) => {
      const { type } = event.paramObject || { type: 'start' };
      progress[type]();
    });

    $tw.rootWidget.addEventListener('om-nprogress-done', (event) => {
      const { type } = event.paramObject || { type: 'done' };
      progress[type]();
    });

    window.onload = function () {
      progress.done();
      const endTime = performance.now();
      const loadTime = Math.floor(endTime - startTime);
      console.log(`🎉 Page loaded in ${loadTime}ms`);
    };
  } catch (e) {}
};
