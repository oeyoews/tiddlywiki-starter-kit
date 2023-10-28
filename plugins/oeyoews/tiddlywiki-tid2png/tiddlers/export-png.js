/*\
title: $:/plugins/oeyoews/tiddlywiki-tid2png/export-png.js
type: application/javascript
module-type: library

export
\*/
const html2canvas = require('html2canvas.min.js');

module.exports = function exportPng(tiddlerTitle, customSelector) {
  if (customSelector && !this.document.querySelector(customSelector)) {
    $tw.wiki.addTiddler({
      title: '$:/temp/export-png',
      text: `不存在 ${customSelector} 节点, 操作取消`,
    });
    $tw.notifier.display('$:/temp/export-png');
    return;
  }
  const title = tiddlerTitle;

  const downloadSvg = $tw.wiki.getTiddlerText(
    '$:/plugins/oeyoews/tiddlywiki-tid2png/download.svg',
  );

  new $tw.NProgress().start();
  const selector = customSelector || `[data-tiddler-title="${title}"]`;
  console.log(customSelector, selector);
  // html2canvas 不支持 cloneNode, 在widget中可以直接移除popup,因为widget会重新渲染, popup 会自动恢复? 但是这是一个listener, 不建议直接修改dom;
  // 下面使用了hidden隐藏titlebar元素, 实际页面不会被用户感知到有所抖动(由于html2canvas是异步)
  const element = document.querySelector(selector);

  const hideElements = [
    '.tc-tiddler-controls',
    '.tc-subtitle',
    '.tc-tags-wrapper',
  ];

  function hideElementsWithSelectors(selectors, display) {
    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        el.style.display = display;
      });
    });
  }

  hideElementsWithSelectors(hideElements, 'none');

  html2canvas(element, {
    useCORS: true,
  }).then((canvas) => {
    canvas.toBlob((blob) => {
      const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
      const imgData = canvas.toDataURL('image/png', 0.8); // 转换canvas为PNG格式的数据URL

      // 这个图片是用来预览的
      const imgNode = new Image();
      imgNode.src = imgData;
      imgNode.crossOrigin = '';
      imgNode.classList.add('max-w-3xl');

      const containerNode = document.createElement('div');

      // 只预览部分内容
      containerNode.classList.add(
        'rounded-lg',
        'overflow-y-hidden',
        'max-h-screen',
        'max-w-3xl',
        'm-0',
      );
      containerNode.appendChild(imgNode);
      new $tw.NProgress().done();

      const downloadPng = (href) => {
        const linkNode = document.createElement('a');
        linkNode.href = href;
        linkNode.download = `${title}.png`;
        linkNode.style.display = 'none';
        document.body.appendChild(linkNode);
        linkNode.click();
        document.body.removeChild(linkNode);
      };

      // TODO
      typeof Swal !== 'undefined'
        ? Swal.fire({
            html: containerNode,
            title: `Image size: ${sizeInMB} MB`,
            showCancelButton: true,
            // confirmButtonColor: "bg-blue-300",
            // cancelButtonColor: "bg-red-300",
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            confirmButtonText: `Download ${downloadSvg}`,
            customClass: 'w-auto my-8',
          }).then((result) => {
            result.isConfirmed && downloadPng(imgData);
          })
        : downloadPng(imgData);
    });
  });

  hideElementsWithSelectors(hideElements, '');
};
