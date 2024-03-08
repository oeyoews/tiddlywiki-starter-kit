#!/usr/bin/env node

const args = process.argv.slice(2)[0];

import config from '../config/index.js';
import prompts from 'prompts';
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import { getRandomString } from 'randomstring-plus';
import { devPlugins } from '../config/plugins.mjs';

const randomstring = getRandomString();
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
          content = content
            .replace(/\$\{pluginname\}/g, replaceString)
            .replace(
              /\{\{ created \}\}/g,
              new Date().toISOString().split('T')[0]
            )
            .replace(/\{\{ widget_name \}\}/g, `widget-${randomstring}`)
            .replace(/\{\{ tw_version \}\}/g, config.pluginversion)
            .replace(/\{\{ plugin_author \}\}/g, config.username);
          fs.writeFileSync(itemPath, content);
        } else if (stats.isDirectory()) {
          traverseFilesAndDirectories(itemPath, replaceString); // Recursively call to handle subdirectories
        }
      });
    });
  });
}

(async function main() {
  let template = 'templates/new-plugin/';
  if (args === 'vue') {
    template = 'templates/new-vue-plugin/';
  }

  const { pluginname } = await prompts({
    onState: onPromptState,
    type: 'text',
    name: 'pluginname',
    message: 'create plugin',
    initial: 'pluginname',
    validate: (value) => {
      if (fs.existsSync(`plugins/${config.username}/${value}`)) {
        return `${value} folder already exists`;
      }
      return true;
    }
  });

  const target = path.join(`plugins/${config.username}`, pluginname);

  fs.copy(template, target).then(() => {
    try {
      traverseFilesAndDirectories(target, pluginname);
      log.succeed(pluginname, '创建完成');
      devPlugins.unshift(pluginname);
      // update devplugins for plugins.mjs file: export const devPlugins = [];
      const pluginFile = fs.readFileSync('config/plugins.mjs', 'utf8');
      fs.writeFileSync(
        'config/plugins.mjs',
        pluginFile.replace(
          /(export const devPlugins = )\[.*?\];/,
          `$1[${devPlugins.map((item) => `'${item}'`).join(', ')}];`
        )
      );
      devPlugins.length && console.log('测试插件', devPlugins);
    } catch (e) {
      fs.rmSync(target, { recursive: true });
      console.log(e);
    }
  });
})();
