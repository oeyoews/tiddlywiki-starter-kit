import fs from 'fs';

export default function newdoc(title) {
  const data = `# ${title}

> description

## 插件在线地址

<TwPlugin name="${title}" />
	`;
  fs.writeFileSync(`docs/plugins/${title}.md`, data);
}
