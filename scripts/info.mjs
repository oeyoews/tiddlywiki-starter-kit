#!/usr/bin/env zx

import { cyan, blue, yellow, bold, dim, green } from "kolorist";
import signale from "signale";

const { description, version, name } = require("../package.json");
const log = console.log;

const platform = os.platform(); // linux
const userInfo = os.userInfo(); // init
const username = userInfo.username; // xxx

log(`${cyan("●") + blue("■") + yellow("▲")}`);
signale.complete({
  prefix: "[Info]",
  message: "Neotw Info",
  suffix: "(@oeyoews)",
});
// console.log(chalk.green(name, version, platform, username));
log(chalk.blue.underline.bold(`Descripion:`) + ` ${description}`);
log(chalk.blue.underline.bold(`Version:`) + ` ${version}`);
