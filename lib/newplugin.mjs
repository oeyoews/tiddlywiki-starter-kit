#!/usr/bin/env node
import config from '../config/index.mjs';
import newdoc from './newdoc.mjs';
import onPromptState from './utils/onPromptsState.mjs';
import traverseFiles from './utils/traverseFiles.mjs';
import chalk from 'chalk';
import fs from 'fs-extra';
import ora from 'ora';
import path from 'path';
import prompts from 'prompts';

const { username, devplugins } = config;

/** 命令行生成新的模版插件 */
const templates = {
  vue: 'templates/new-vue-plugin/', // framework is Vue3
  general: 'templates/new-plugin/', // vanilla js
};

/** @type {keyof typeof templates} */
const args = process.argv.slice(2)[0] || 'general';

if (!templates[args]) {
  console.log(chalk.red.underline.bold(`不受支持的模版: (${args})`));
  process.exit(0);
}

const log = ora('starting ...');

(async function main() {
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

  const template = templates[args];
  console.log(chalk.green(`${args} 插件`));

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
