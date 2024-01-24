#!/usr/bin/env node

import chalk from 'chalk';
import createApp from './lib/create-app';

createApp().catch((e) => {
  console.error(chalk.red.bold('[ERROR]: Create tw app somethin wrong !!!'));
  console.log(e);
});
