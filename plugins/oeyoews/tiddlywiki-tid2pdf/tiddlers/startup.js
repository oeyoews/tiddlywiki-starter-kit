/*\
title: tid2pdf/startup.js
type: application/javascript
module-type: startup

tid2pdf module

\*/
// TODO: merge om-export-png and widget code
(function() {
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
        canvas.toBlob(blob => {
          const sizeInBytes = blob.size;
          const sizeInMB = sizeInBytes / (1024 * 1024);
          const imgData = canvas.toDataURL('image/png'); // 转换canvas为PNG格式的数据URL

          const imgNode = new Image();
          imgNode.src = imgData;
          imgNode.crossOrigin = '';
          const cloneImgNode = imgNode.cloneNode(true);
          cloneImgNode.style.width = '512px';
          cloneImgNode.classList.add('shadow-sm');

          const downloadPng = imgData => {
            const linkNode = $tw.utils.domMaker('a', {
              attributes: {
                href: imgData,
                download: title,
              },
            });
            linkNode.click();
          };

          swal({
            icon: 'success',
            title,
            content: cloneImgNode,
            text: `Image size: ${sizeInMB.toFixed(2)} MB`,
            buttons: {
              download: {
                text: 'Download',
                value: true,
              },
              cancel: 'Cancel',
            },
            className: 'w-auto',
          }).then(value => {
            if (value) {
              downloadPng(imgData);
            }
            NProgress.done();
          });
        }, 'image/png');
      });
    });
  };
})();
