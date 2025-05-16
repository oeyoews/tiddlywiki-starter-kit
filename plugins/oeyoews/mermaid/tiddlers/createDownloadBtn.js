/*\
title: $:/plugins/oeyoews/mermaid/createDownloadBtn.js
type: application/javascript
module-type: library

\*/

function downloadSvg(svgContent, filename) {
  // 创建Blob对象
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  // 创建下载链接
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'mermaid-diagram.svg';

  // 添加到文档并触发点击
  document.body.appendChild(link);
  link.click();

  // 清理
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function toggleFullscreen(element) {
  if (!document.fullscreenElement) {
    element.requestFullscreen().catch((err) => {
      console.warn(`全屏请求失败: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function createFullscreenBtn(domNode) {
  const fullscreenButton = document.createElement('button');
  const fullscreenIcon = $tw.wiki.getTiddlerText(
    '$:/plugins/oeyoews/mermaid/fullscreen-icon',
  );
  fullscreenButton.innerHTML = fullscreenIcon;
  fullscreenButton.title = '全屏显示';
  fullscreenButton.className = 'mermaid-fullscreen-btn';

  fullscreenButton.addEventListener('click', function (e) {
    e.stopPropagation(); // 防止事件冒泡
    toggleFullscreen(domNode);
  });

  // 添加按钮到DOM
  domNode.appendChild(fullscreenButton);
}

function createDownloadBtn(domNode, svgContent) {
  const downloadButton = document.createElement('button');
  const downloadIcon = $tw.wiki.getTiddlerText(
    '$:/plugins/oeyoews/mermaid/download-icon',
  );
  downloadButton.innerHTML = downloadIcon;
  downloadButton.title = 'Download SVG';
  downloadButton.className = 'mermaid-download-btn';

  downloadButton.addEventListener('click', function (e) {
    e.stopPropagation(); // 防止事件冒泡
    downloadSvg(svgContent, `mermaid-diagram-${Date.now()}.svg`);
  });

  // 添加按钮到DOM
  domNode.appendChild(downloadButton);

  // 添加全屏按钮
  createFullscreenBtn(domNode);
}

module.exports = createDownloadBtn;
