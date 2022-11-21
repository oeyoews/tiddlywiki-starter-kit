#!/usr/bin/env zx

import { cyan, blue, yellow } from "kolorist";
const { description, version, name } = require("../package.json");
const log = console.log;

export default log(
  `${cyan("●") + blue("■") + yellow("▲")}` +
    chalk.blue.bold(` ${name}:`) +
    chalk.blue.cyan(` ${description}(${version}):`)
);
