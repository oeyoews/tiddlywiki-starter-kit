/*\
title: $:/plugins/oeyoews/markdown-importer/importer.js
type: application/javascript
module-type: library

markdown-importer library

\*/
async function readMarkdownFolder() {
  // 显示文件夹选择器
  const dirHandle = await window.showDirectoryPicker();
  const mdFiles = [];

  // 遍历目录
  // TODO：考虑命名重复弹窗提示
  // TODO: 进度条提示， 数量提示
  for await (const entry of dirHandle.values()) {
    if (entry.kind === 'file' && entry.name.endsWith('.md')) {
      const file = await entry.getFile();
      const text = await file.text(); // 读取文件内容
      const modified = new Date(file.lastModified); // 转换为日期对象

      mdFiles.push({
        title: file.name.slice(0, -3),
        text,
        modified,
      });
    }
  }

  return mdFiles;
}

module.exports = readMarkdownFolder;
