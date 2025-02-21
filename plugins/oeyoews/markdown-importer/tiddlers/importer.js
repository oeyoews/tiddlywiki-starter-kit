/*\
title: $:/plugins/oeyoews/markdown-importer/importer.js
type: application/javascript
module-type: library

markdown-importer library

\*/

// 普通对象扁平化
function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key; // 生成扁平键名
    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      Object.assign(acc, flattenObject(obj[key], newKey)); // 递归展开
    } else {
      acc[newKey] = obj[key]; // 直接赋值
    }
    return acc;
  }, {});
}

/**
 * @param {string} content
 * @returns
 */
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n*/);

  if (!match) return { metadata: null, body: content };

  return {
    metadata: match[1], // 获取 Frontmatter 的内容
    body: content.replace(match[0], ''), // 去掉 Frontmatter 后的正文
  };
}

const jsyaml = require('./js-yaml.min.js');
window.jsyaml = jsyaml;

const defaultIgnoreFolders = ['node_modules', '.vscode', '.git', '.idea'];

async function readMarkdownFolder(
  dirHandle = null,
  ignoreFolders = defaultIgnoreFolders,
) {
  if (!dirHandle) {
    dirHandle = await window.showDirectoryPicker();
  }

  const mdFiles = [];

  for await (const entry of dirHandle.values()) {
    if (entry.kind === 'file' && entry.name.endsWith('.md')) {
      const file = await entry.getFile();
      let text = await file.text();
      let fields = {};
      window.text = text;
      const meta = parseFrontMatter(text).metadata;
      text = parseFrontMatter(text).body;

      if (meta) {
        // NOTE: 注意不要解析整个text, 防止意外报错
        fields = flattenObject(jsyaml.loadAll(meta)[0]);
      }

      // NOTE: 不能为空或者NAN
      const modified = (new Date(file.lastModified) || new Date())
        .toISOString()
        .replace(/\D/g, '');
      const mdFile = {
        title: file.name.slice(0, -3),
        text,
        ...fields,
        modified, // 提升优先级
      };
      mdFiles.push(mdFile);
    } else if (
      entry.kind === 'directory' &&
      !ignoreFolders.includes(entry.name) &&
      !entry.name.startsWith('.')
    ) {
      // 递归遍历子目录
      const subFiles = await readMarkdownFolder(entry, ignoreFolders);
      mdFiles.push(...subFiles);
    }
  }

  return mdFiles;
}

module.exports = readMarkdownFolder;
