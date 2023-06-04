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
      // add adjuge
      const paramObject = event.paramObject || {};
      // NOTE: this tid must have storylist be rendered by tw
      const title =
        paramObject.title || $tw.wiki.getTiddlerText('$:/temp/focussedTiddler');
      const selector = `[data-tiddler-title="${title}"]`;

      var element = document.querySelector(selector);

      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png'); // 转换canvas为PNG格式的数据URL

        const linkNode = $tw.utils.domMaker('a', {
          attributes: {
            href: imgData,
            download: title,
          },
        });

        pushNotify('info', 'PNG', `Wait a moment to export ${title}.png`);
        // 模拟单击事件以触发下载
        linkNode.click();

        // 将<a>元素从页面上移除
        document.body.removeChild(linkNode);
      });
    });
  };
})();
