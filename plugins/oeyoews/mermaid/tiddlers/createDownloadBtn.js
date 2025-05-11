/*\
title: $:/plugins/oeyoews/mermaid/createDownloadBtn.js
type: application/javascript
module-type: library

\*/

const downloadSvg = require('./downloadSvg.js');

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
    downloadSvg(svgContent);
  });

  // 添加按钮到DOM
  domNode.appendChild(downloadButton);
}

module.exports = createDownloadBtn;
