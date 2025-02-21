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
async function readMarkdownFolder(dirHandle = null) {
  if (!dirHandle) {
    dirHandle = await window.showDirectoryPicker();
  }

  const mdFiles = [];

  for await (const entry of dirHandle.values()) {
    if (entry.kind === 'file' && entry.name.endsWith('.md')) {
      const file = await entry.getFile();
      let text = await file.text();
      text = parseFrontMatter(text);
      const modified = new Date(file.lastModified);

      mdFiles.push({
        title: file.name.slice(0, -3),
        text,
        modified,
      });
    } else if (entry.kind === 'directory') {
      // 递归遍历子目录
      const subFiles = await readMarkdownFolder(entry);
      mdFiles.push(...subFiles);
    }
  }

  return mdFiles;
}

module.exports = readMarkdownFolder;
