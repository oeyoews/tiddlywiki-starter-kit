/*\
title: tid2pdf/startup.js
type: application/javascript
module-type: startup

tid2pdf module

\*/
// TODO: merge om-export-png and widget code
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'tid2pdf-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
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
        canvas.toBlob(blob => {
          const sizeInBytes = blob.size;
          const sizeInMB = sizeInBytes / (1024 * 1024);
          const imgData = canvas.toDataURL('image/png'); // 转换canvas为PNG格式的数据URL

          const imgNode = new Image();
          imgNode.src = imgData;
          imgNode.crossOrigin = '';
          const cloneImgNode = imgNode.cloneNode(true);
          cloneImgNode.style.width = '712px';

          const containerNode = document.createElement('div');
          containerNode.classList.add(
            'border',
            'border-2',
            'p-1',
            'rounded',
            'overflow-y-scroll',
            'h-screen',
            'shadow-md',
          );
          containerNode.appendChild(cloneImgNode);

          /* function isPC() {
  var platform = navigator.platform;
  return platform.indexOf("Win") === 0 || platform.indexOf("Mac") === 0 || platform.indexOf("Linux") === 0;
}
// 调用函数判断当前环境是否是PC
var isCurrentEnvironmentPC = isPC();

// 输出结果
console.log("当前环境是否是PC：", isCurrentEnvironmentPC); */

          // if is pc to preview
          const preview = true;
          // const isPc = $tw.utils.isPc();

          const downloadPng = imgData => {
            const linkNode = $tw.utils.domMaker('a', {
              attributes: {
                href: imgData,
                download: title,
              },
            });
            linkNode.click();
          };
          // BUG: on phone, it's nothing even preview is normal on pck'iphone emulate env
          !preview && downloadPng(imgData);
          preview &&
            Swal.fire({
              icon: 'success',
              title: title,
              html: containerNode,
              text: `Image size: ${sizeInMB.toFixed(2)} MB`,
              showCancelButton: true,
              confirmButtonText: 'Download',
              cancelButtonText: 'Cancel',
              customClass: 'w-auto',
            }).then(result => {
              result.isConfirmed && downloadPng(imgData);
              NProgress.done();
            });
        }, 'image/png');
      });
    });
  };
})();
