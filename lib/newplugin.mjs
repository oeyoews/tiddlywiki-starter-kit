#!/usr/bin/env node

import prompts from 'prompts';
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';

const log = ora('starting ...');
/**
 * @description prompts elegant exit cmd
 * @param state
 */
const onPromptState = (state) => {
  if (state.aborted) {
    process.stdout.write('\x1B[?25h');
    process.stdout.write('\n');
    process.exit(0);
  }
};

/**
 * @description 递归读取文件, 并且批量替换pluginname
 * @param directoryPath 目录
 * @param replaceString 替换字符串
 */
function traverseFilesAndDirectories(directoryPath, replaceString) {
  fs.readdir(directoryPath, (err, filesAndDirectories) => {
    filesAndDirectories.forEach((item) => {
      const itemPath = path.join(directoryPath, item);
      fs.stat(itemPath, (err, stats) => {
        if (stats.isFile()) {
          let content = fs.readFileSync(itemPath, 'utf8');
          content = content.replace(/\$\{pluginname\}/g, replaceString);
          fs.writeFileSync(itemPath, content);
        } else if (stats.isDirectory()) {
          traverseFilesAndDirectories(itemPath, replaceString); // Recursively call to handle subdirectories
        }
      });
    });
  });
}

async function main() {
  const template = 'templates/new-plugin/';

  const { pluginname } = await prompts({
    onState: onPromptState,
    type: 'text',
    name: 'pluginname',
    message: 'create plugin',
    initial: 'pluginname',
    validate: (value) => {
      if (fs.existsSync(`plugins/oeyoews/${value}`)) {
        return `${value} folder already exists`;
      }
      return true;
    },
  });

  const target = path.join('plugins/oeyoews', pluginname);

  fs.copy(template, target).then(() => {
    try {
      traverseFilesAndDirectories(target, pluginname);
      log.succeed(pluginname, '创建完成');
    } catch (e) {
      fs.rmSync(target, { recursive: true });
      console.log(e);
    }
  });
}

main();
