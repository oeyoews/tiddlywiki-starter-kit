/*\
title: $:/plugins/oeyoews/tiddlywiki-tid2png/export-png.js
type: application/javascript
module-type: library

export
\*/
const html2canvas = require('html2canvas.min.js');

module.exports = function exportPng(title, customSelector) {
  if (customSelector && !this.document.querySelector(customSelector)) {
    $tw.wiki.addTiddler({
      title: '$:/temp/export-png',
      text: `不存在 ${customSelector} 节点，操作取消`
    });
    $tw.notifier.display('$:/temp/export-png');
    return;
  }

  const downloadSvg = $tw.wiki.getTiddlerText(
    '$:/plugins/oeyoews/tiddlywiki-tid2png/download.svg'
  );
  const progress = $tw.NProgress;

  progress.start();
  const selector = customSelector || `[data-tiddler-title="${title}"]`;
  // html2canvas 不支持 cloneNode, 在 widget 中可以直接移除 popup，因为 widget 会重新渲染，popup 会自动恢复？但是这是一个 listener, 不建议直接修改 dom;
  // 下面使用了 hidden 隐藏 titlebar 元素，实际页面不会被用户感知到有所抖动 (由于 html2canvas 是异步)
  const element = document.querySelector(selector);

  const hideElements = [
    '.tc-tiddler-controls',
    '.tc-subtitle',
    '.tc-tags-wrapper'
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
    useCORS: true
  }).then((canvas) => {
    canvas.toBlob((blob) => {
      const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
      const imgData = canvas.toDataURL('image/png', 0.8); // 转换 canvas 为 PNG 格式的数据 URL

      // 这个图片是用来预览的
      const imgNode = $tw.utils.domMaker('img', {
        class: 'max-w-3xl',
        attributes: {
          src: imgData,
          crossOrigin: ''
        }
      });

      // 只预览部分内容
      const containerNode = $tw.utils.domMaker('div', {
        class: 'rounded-lg overflow-y-hidden max-h-screen max-w-3xl m-0',
        children: [imgNode]
      });

      progress.done();

      const downloadPng = (href) => {
        const linkNode = this.document.createElement('a');
        linkNode.href = href;
        linkNode.download = `${title}.png`;
        linkNode.style.display = 'none';
        document.body.appendChild(linkNode);
        linkNode.click();
        document.body.removeChild(linkNode);
      };

      $tw.modules.titles['$:/plugins/oeyoews/neotw-swal2/swal2.min.js']
        ? Swal.fire({
            html: containerNode,
            title: `Image size: ${sizeInMB} MB`,
            showCancelButton: true,
            // confirmButtonColor: "bg-blue-300",
            // cancelButtonColor: "bg-red-300",
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            confirmButtonText: `Download ${downloadSvg}`,
            customClass: 'w-auto my-8'
          }).then((result) => {
            result.isConfirmed && downloadPng(imgData);
          })
        : downloadPng(imgData);
    });
  });

  hideElementsWithSelectors(hideElements, '');
};
