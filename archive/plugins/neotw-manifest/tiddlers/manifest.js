/*\
title: manifest.js
type: application/javascript
module-type: library

manifest
\*/

function Manifest() {
  const fileName = 'manifest.json';

  // 创建 link 元素
  const manifestLink = document.createElement('link');
  manifestLink.rel = 'manifest';

  manifestLink.href = fileName;

  // 将 link 元素添加到 head 中
  document.head.appendChild(manifestLink);
}

module.exports = {
  Manifest,
};
