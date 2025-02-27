/*\
title: $:/plugins/oeyoews/tiddlywiki-tid2png/export-png.js
type: application/javascript
module-type: library

export
\*/
const html2canvas = require('html2canvas.min.js');
const processImage = require('./processImage');
const addFooter = require('./addFooter');

const swal2 = $tw.modules.titles['$:/plugins/oeyoews/neotw-swal2/swal2.min.js'];
const downloadSvg = $tw.wiki.getTiddlerText(
  '$:/plugins/oeyoews/tiddlywiki-tid2png/download.svg',
);
const progress = $tw.NProgress;

const hideElements = [
  // '.gk0wk-notionpagebg',
  '.tc-tiddler-controls', // 必须要使用 style: display: !important
  '.renaming-tiddler-ai',
  '.neotw-publish-status',
  '.neotw-subtitle-link',
  '.neotw-avatar-link', // html2canvas 图片不会进行重定向， 导致加载失败
  // '.tc-tags-wrapper'
  '.tc-subtitle', // 效果不好，隐藏
  '.recommend-tiddler-ai',
  '.data-html2canvas-ignore', // 手动加上， 不起作用
  '.tc-tiddler-title-icon',
];

const downloadPng = (href, title) => {
  const linkNode = this.document.createElement('a');
  linkNode.href = href;
  linkNode.download = `${title}.png`;
  linkNode.style.display = 'none';
  document.body.appendChild(linkNode);
  linkNode.click();
  document.body.removeChild(linkNode);

  localStorage.setItem('tid2png', 'no');
  progress.done();
};

/**
 * @param {HTMLElement} targetEl
 * @param {[]} selectors
 * @param {boolean} show
 */
function hideElementsWithSelectors(targetEl, selectors, show) {
  selectors.forEach((selector) => {
    const elements = targetEl.querySelectorAll(selector);
    elements.forEach((el) => {
      // el.hidden = show;
      el.style.setProperty('display', show, 'important');
    });
  });
}

module.exports = async function exportPng(title, customSelector) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker
  // NOTE: 这仍然无法获取用户是否取消了操作.
  let isExporting = localStorage.getItem('tid2png') || 'no';
  // if (isExporting === 'yes') {
  //   console.info('正在导出');
  //   // return;
  // }
  localStorage.setItem('tid2png', 'yes');
  if (customSelector && !this.document.querySelector(customSelector)) {
    $tw.wiki.addTiddler({
      title: '$:/temp/export-png',
      text: `不存在 ${customSelector} 节点，操作取消`,
    });
    $tw.notifier.display('$:/temp/export-png');
    return;
  }

  progress.start();
  const selector = customSelector || `[data-tiddler-title="${title}"]`;
  // @see: https://github.com/niklasvh/html2canvas/issues/1414
  // html2canvas 不支持 cloneNode, 在 widget 中可以直接移除 popup，因为 widget 会重新渲染，popup 会自动恢复？但是这是一个 listener, 不建议直接修改 dom;
  // 下面使用了 hidden 隐藏 titlebar 元素，实际页面不会被用户感知到有所抖动 (由于 html2canvas 是异步)
  // const targetEl = document.querySelector(selector);
  // hideElements.forEach((el) => {
  //   // targetEl.querySelector(el).style.display = 'none';
  //   targetEl.querySelector(el).hidden = true;
  // });
  // if (!targetEl) {
  //   console.error('导出节点未找到');
  //   return;
  // }
  const targetEl = document.querySelector(selector);
  // @see: https://html2canvas.hertzen.com/configuration
  const canvas = await html2canvas(targetEl, {
    useCORS: true,
    // proxy: 'https://corsproxy.io/?',
    backgroundColor: null,
    logging: false,
    // imageTimeout: 3000,
    onclone: function (documentClone) {
      const targetEl = documentClone.querySelector(selector);
      // targetEl.style.borderRadius = '20px';
      targetEl.style.border = 'none';
      // 不支持跨域图片， 除非借助代理服务器, proxy 参数
      hideElements.forEach((el) => {
        const hiddenEl = targetEl.querySelector(el);
        if (hiddenEl) {
          hiddenEl.hidden = true;
        }
      });
      // addFooter(targetEl, documentClone);
    },
  });

  const newCanvas = document.createElement('canvas');

  await processImage(newCanvas, canvas.toDataURL('image/png'), {
    padding: 40,
    radius: 20,
    colors: ['#aee3ff', '#cefdb6'],
  });

  newCanvas.toBlob((blob) => {
    const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
    const imgData = newCanvas.toDataURL('image/png', 0.8); // 转换 canvas 为 PNG 格式的数据 URL

    const imgNode = $tw.utils.domMaker('img', {
      // 这个图片是用来预览的
      class: 'max-w-3xl',
      attributes: {
        src: imgData,
        crossOrigin: '',
      },
    });

    // 只预览部分内容
    const containerNode = $tw.utils.domMaker('div', {
      class: 'rounded-lg overflow-y-hidden max-h-screen max-w-3xl m-0',
      children: [imgNode],
    });

    swal2
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
          result.isConfirmed && downloadPng(imgData, title);
        })
      : downloadPng(imgData, title);
  });
};
