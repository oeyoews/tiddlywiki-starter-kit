/*\
title: $:/plugins/oeyoews/markdown-importer/importer.js
type: application/javascript
module-type: library

markdown-importer library

\*/

/**
 * 烤炉到frontmatter 有递归的情况， 暂时不进行识别字段
 * @param {string} content
 * @returns
 */
function parseFrontMatter(content) {
  if (!content.startsWith('---')) return content;
  return content.replace(/^---\n[\s\S]*?\n---\n*/, '');
}

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
      let text = await file.text(); // 读取文件内容
      text = parseFrontMatter(text);
      const modified = new Date(file.lastModified); // 转换为日期对象

      let fields = {
        title: file.name.slice(0, -3),
        text,
        modified,
      };

      mdFiles.push(fields);
    }
  }

  return mdFiles;
}

module.exports = readMarkdownFolder;
