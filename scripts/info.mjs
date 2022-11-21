#!/usr/bin/env zx

import { cyan, blue, yellow } from "kolorist";
import signale from "signale";
const { description, version, name } = require("../package.json");
const log = console.log;

function info() {
  log(
    `${cyan("●") + blue("■") + yellow("▲")}` +
    chalk.blue.bold(` ${name}: `) +
    chalk.blue.cyan(` ${description} (${version}): `)
  );
}

function finish() {
  signale.success("Building successful");
}

export { finish, info };
