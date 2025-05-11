/*\
title: $:/plugins/oeyoews/mermaid/downloadSvg.js
type: application/javascript
module-type: library

\*/

// 下载SVG文件的辅助函数
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

module.exports = downloadSvg;

// function getStyleFromSvg(svg) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(svg, 'image/svg+xml');
//   return doc.querySelector('svg').style.cssText;
// }
// function svg2Img(svg) {
//   const style = getStyleFromSvg(svg);
//   return `<img src="data:image/svg+xml,${encodeURIComponent(svg)}" class="spotlight" style="${style}"/>`;
// }

// function centerSvg(svg) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(svg, 'image/svg+xml');
//   const style = doc.querySelector('svg').style;
//   style.display = 'block';
//   style.margin = '0 auto';
//   return doc.documentElement.outerHTML;
// }
