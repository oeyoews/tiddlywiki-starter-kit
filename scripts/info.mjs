#!/usr/bin/env zx

const { version, name } = require("../package.json");

const platform = os.platform(); // linux
const userInfo = os.userInfo(); // init
const username = userInfo.username; // xxx

console.log(chalk.green(name, version, platform, username));
