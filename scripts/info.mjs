#!/usr/bin/env zx

import { cyan, blue, yellow, bold, dim, green } from "kolorist";
const { description, version, name } = require("../package.json");
const log = console.log;

const platform = os.platform(); // linux
const userInfo = os.userInfo(); // init
const username = userInfo.username; // xxx

// console.log(chalk.green(name, version, platform, username));
log(`${cyan("●") + blue("■") + yellow("▲")}`);
log(chalk.blue.underline.bold(`Descripion:`) + ` ${description}`);
log(chalk.blue.underline.bold(`Version:`) + ` ${version}`);
