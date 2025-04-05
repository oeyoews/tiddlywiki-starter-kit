import fs from 'fs';

/**
 * Creates a new document with the given title.
 * @param {string} title - Pluginname
 * @return {void}
 */
export default function newdoc(title) {
  const data = `# ${title}

> your ${title} description

## 插件在线地址

<TwPlugin name="${title}" />
	`;
  fs.writeFileSync(`docs/plugins/${title}.md`, data);
}
