/*\
title: tid2pdf/startup.js
type: application/javascript
module-type: startup

tid2pdf module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'tid2pdf-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    window.html2canvas = require('html2canvas.min.js');

    $tw.rootWidget.addEventListener('om-export-png', event => {
      NProgress.start();
      // add judge
      const paramObject = event.paramObject || {};
      // NOTE: this tid must have storylist be rendered by tw
      const title =
        paramObject.title || $tw.wiki.getTiddlerText('$:/temp/focussedTiddler');
      const selector = `[data-tiddler-title="${title}"]`;
      const element = document.querySelector(selector);

      html2canvas(element, {
        useCORS: true,
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png'); // 转换canvas为PNG格式的数据URL

        const linkNode = $tw.utils.domMaker('a', {
          attributes: {
            href: imgData,
            download: title,
          },
        });
        linkNode.click();
        NProgress.done();
      });
    });
  };
})();
