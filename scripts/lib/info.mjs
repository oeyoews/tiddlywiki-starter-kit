#!/usr/bin/env zx

// https://bobbyhadz.com/blog/javascript-export-class
// import { cyan, blue, yellow } from "kolorist";
import signale from 'signale';

const { description, version, name } = fs.readJsonSync('./package.json');
const log = console.log;

signale.config({
  // displayFilename: true,
  // displayTimestamp: true,
  // displayDate: true,
});

/* info */
const msg = {
  // info
  info: () => {
    const timestamp = new Date();
    log(`📅 ${timestamp}`);
    log(
      // `${cyan("●") + blue("■") + yellow("▲")}` +
      chalk.blue.bold(`🚀 ${name}: `) +
        chalk.blue.cyan(` ${description} (${version}): `),
    );
  },

  // finish
  finish: (text = 'Operation successful') => {
    signale.success(text);
  },

  fatal: e => {
    // signale.error(new Error(e));
  },
};

export default msg;
