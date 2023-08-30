#!/usr/bin/env node

import chalk from 'chalk';
import createApp from './create-app';

createApp().catch(e => {
  console.error(chalk.red.bold('程序错误'));
  console.log(e);
});