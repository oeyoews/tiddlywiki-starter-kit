#!/usr/bin/env zx

import { cyan, blue, yellow } from "kolorist";
import signale from "signale";
const { description, version, name } = require("../package.json");
const log = console.log;

signale.config({
  // displayFilename: true,
  // displayTimestamp: true,
  // displayDate: true,
});

function info() {
  log("");
  log(
    `${cyan("●") + blue("■") + yellow("▲")}` +
      chalk.blue.bold(` ${name}: `) +
      chalk.blue.cyan(` ${description} (${version}): `)
  );
  log("");
}

function finish() {
  signale.success("Operation successful");
}

export { finish, info };
