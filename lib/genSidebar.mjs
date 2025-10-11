import fs from 'fs';
import path from 'path';

// 用于生成 vitepress docs 的侧边栏文件
const docsDir = path.join('docs', 'plugins'); // 设置docs/plugins目录路径
const sidebarPath = path.join(
  'docs',
  '.vitepress',
  'scripts',
  'pluginlist.json',
); // 设置sidebar.json路径

// 递归获取目录下的所有md文件名字
function getMdFileNames(dir) {
  let fileNames = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fileNames = fileNames.concat(getMdFileNames(filePath));
    } else if (file.endsWith('.md')) {
      fileNames.push(file);
    }
  });

  return fileNames.filter((item) => item !== 'index.md');
}

// 将md文件名写入sidebar.json文件
function genSidebar() {
  const fileNames = getMdFileNames(docsDir);
  const data = Array.from(fileNames, (item) => {
    const filename = item.replace('.md', '');
    return {
      text: filename,
      link: '/plugins/' + filename,
    };
  });

  fs.writeFileSync(sidebarPath, JSON.stringify(data, null, 2));
  console.log('侧边栏已更新');
}

export default genSidebar;
