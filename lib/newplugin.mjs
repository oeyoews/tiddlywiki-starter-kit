#!/usr/bin/env node

import prompts from 'prompts';
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import config from '../config/index.mjs';
import newdoc from './newdoc.mjs';
import traverseFiles from './utils/traverseFiles.mjs';
import onPromptState from './utils/onPromptsState.mjs';
import chalk from 'chalk';

const { username, devplugins } = config;
/** 命令行生成新的模版插件 */
const args = process.argv.slice(2)[0];
const log = ora('starting ...');

(async function main() {
  let template = 'templates/new-plugin/';

  const { pluginname } = await prompts({
    onState: onPromptState,
    type: 'text',
    name: 'pluginname',
    message: 'create plugin',
    initial: 'pluginname',
    validate: (value) => {
      if (fs.existsSync(`plugins/${username}/${value}`)) {
        return `${value} folder already exists`;
      }
      return true;
    },
  });

  const { isNewDoc } = await prompts({
    onState: onPromptState,
    type: 'confirm',
    name: 'isNewDoc',
    message: 'create doc',
    initial: false,
  });

  /** Usage: pnpm new vue */
  switch (args) {
    case 'vue':
      console.log(chalk.green('vue 插件'));
      template = 'templates/new-vue-plugin/';
      break;
    case 'lib':
      // remove widget.js
      break;

    default:
      break;
  }

  const target = path.join(`plugins/${username}`, pluginname);

  fs.copy(template, target).then(() => {
    try {
      traverseFiles(target, pluginname);
      log.succeed(pluginname, '创建完成');
      devplugins.unshift(pluginname);

      if (isNewDoc) {
        newdoc(pluginname);
      }

      fs.writeFileSync(
        'config/dev-plugins.json',
        JSON.stringify([...new Set(devplugins)], null, 2),
      );
      devplugins.length > 0 && console.log('测试插件', devplugins);
    } catch (e) {
      fs.rmSync(target, { recursive: true });
      console.log(e);
    }
  });
})();
