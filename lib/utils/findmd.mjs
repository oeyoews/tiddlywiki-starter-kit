// prompt: 写一个mjs脚本, 找到所有的.md和.meta扩展文件并且放在新的目录下面, 使用mjs语法, 新的目录名字可以指定, 将meta文件放在目录文件的meta目录, 输出当前操作系统,md meta数量等信息, 使用chalk美化输出

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

function findAndMoveMdFiles(sourceDir, destinationDir) {
  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
  }

  // Create the meta directory inside the destination directory
  const metaDir = path.join(destinationDir, 'meta');
  if (!fs.existsSync(metaDir)) {
    fs.mkdirSync(metaDir);
  }

  // Read all files in the source directory
  const files = fs.readdirSync(sourceDir);

  // Filter out all .md and .meta files
  const mdAndMetaFiles = files.filter((file) => {
    const ext = path.extname(file);
    return ext === '.md' || ext === '.meta';
  });

  // Move each .md and .meta file to the destination directory or the meta directory
  let mdCount = 0;
  let metaCount = 0;
  mdAndMetaFiles.forEach((file) => {
    if (file.startsWith('.gitignore.meta') || file.endsWith('.svg.meta'))
      return;
    const sourcePath = path.join(sourceDir, file);
    let destinationPath;
    if (path.extname(file) === '.md') {
      destinationPath = path.join(destinationDir, file);
      mdCount++;
    } else {
      destinationPath = path.join(metaDir, file);
      metaCount++;
    }
    fs.renameSync(sourcePath, destinationPath);
  });

  // Output current operating system and md/meta file count
  const os = process.platform;
  console.log(chalk.blue(`Operating System: ${os}`));
  console.log(chalk.green(`Number of .md files moved: ${mdCount}`));
  console.log(chalk.green(`Number of .meta files moved: ${metaCount}`));
}

// Example usage
const sourceDirectory = './tiddlers';
const destinationDirectory = './tiddlers/markdown-content-by-script';
findAndMoveMdFiles(sourceDirectory, destinationDirectory);
