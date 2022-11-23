#!/usr/bin/env zx

import { cyan, blue, yellow } from "kolorist";
import signale from "signale";

const { description, version, name } = require("../package.json");
const log = console.log;

// TODO:: use Info.xxx
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

function finish(text) {
  text = text || "Operation successful";
  signale.success(text);
}

export { finish, info };
