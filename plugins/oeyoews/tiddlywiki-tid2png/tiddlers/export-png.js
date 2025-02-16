/*\
title: $:/plugins/oeyoews/tiddlywiki-tid2png/export-png.js
type: application/javascript
module-type: library

export
\*/
const html2canvas = require('html2canvas.min.js');

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
  // '.tc-subtitle',
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
    backgroundColor: null,
    logging: false,
    // imageTimeout: 3000,
    onclone: function (documentClone) {
      const targetEl = documentClone.querySelector(selector);
      targetEl.style.borderRadius = '20px';
      hideElements.forEach((el) => {
        const hiddenEl = targetEl.querySelector(el);
        if (hiddenEl) {
          hiddenEl.hidden = true;
        }
      });
      const powerBy = documentClone.createElement('span');
      powerBy.textContent = 'Powered by TiddlyWiki5 & oeyoews';
      powerBy.style.textAlign = 'right';
      powerBy.style.color = 'lightgray';
      const logoNode = documentClone.createElement('span');
      // powerBy.append(logoNode);
      // logoNode.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 0l10.23 6v12L12 24L1.77 18V6zm3.961 17.889l.154-.02c.113-.043.22-.081.288-.19c.227-.329-.357-.462-.566-.827s-1.071-2.364-.418-2.924s1.359-.79 1.629-1.315c.117-.236.238-.475.269-.742c.159.132.283.255.497.262c.567.036 1.054-.658 1.307-1.315c.135-.404.244-.832.218-1.226c-.069-.76.013-1.582.62-2.087c-.599.302-1.167.69-1.845.789c-.374-.114-.75-.216-1.147-.2c-.194-.253-.456-.727-.797-.782c-.58.208-.597 1.105-.842 2.321a5.4 5.4 0 0 0-1.154-.193c-.54-.035-1.42.134-2.038.116c-.619-.018-1.836-.562-2.849-.445c-.407.05-.817.12-1.195.291c-.231.105-.565.421-.733.468c-1.69.473-4.442.453-3.879-2.102c.044-.196.056-.373-.03-.417c-.11-.055-.17.06-.234.187c-.985 2.138.764 3.514 2.752 3.52c.625-.048.324-.007.904-.118l-.015.082a1.87 1.87 0 0 0 .865 1.718c-.27.771-.805 1.389-1.173 2.097c.138.881 1.031 2.057 1.4 2.225c.326.147 1.036.149 1.2-.089c.059-.111.02-.351-.044-.474c.277.308.651.736 1.013.942c.217.104.434.17.677.18l.31-.016c.154-.033.336-.058.44-.195c.116-.2.007-.756-.476-.796s-.795-.222-1.24-.882c-.365-.638.077-1.517.226-2.145c.765.123 1.535.22 2.31.222c.336-.017.67-.03 1.001-.093c.106.27.402 1.025.404 1.239c.007.601-.219 1.205-.121 1.807c.06.177.005.512.35.526l.388.018l.267-.008c.341.573.637.572 1.307.591m-7.518-1.66l-.063-.056c-.184-.198-.66-.544-.572-.865c.075-.238.213-.457.323-.683l-.004.023c-.02.282-.059.56.032.837c.278.228.663.59.918.837c-.138-.038-.4-.117-.53-.066l-.104-.026z"></path></svg>`;
      // targetEl.append(powerBy);
    },
  });

  canvas.toBlob((blob) => {
    const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
    const imgData = canvas.toDataURL('image/png', 0.8); // 转换 canvas 为 PNG 格式的数据 URL

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
