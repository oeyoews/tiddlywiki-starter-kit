// prompt: 写一个mjs脚本, 找到所有的.md和.meta扩展文件并且放在新的目录下面, 使用mjs语法, 新的目录名字可以指定, 将meta文件放在目录文件的meta目录

import fs from 'fs';
import path from 'path';

function findAndMoveMdFiles(sourceDir, destinationDir) {
  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
  }

  // Read all files in the source directory
  const files = fs.readdirSync(sourceDir);

  // Filter out all .md and .meta files
  const mdAndMetaFiles = files.filter((file) => {
    const ext = path.extname(file);
    return ext === '.md' || ext === '.meta';
  });

  // Move each .md and .meta file to the destination directory
  mdAndMetaFiles.forEach((file) => {
    if (file.startsWith('.gitignore.meta')) return;
    const sourcePath = path.join(sourceDir, file);
    const destinationPath = path.join(destinationDir, file);
    fs.renameSync(sourcePath, destinationPath);
  });
}

// Example usage
const sourceDirectory = './tiddlers';
const destinationDirectory = './tiddlers/markdown-content-by-script';
findAndMoveMdFiles(sourceDirectory, destinationDirectory);
