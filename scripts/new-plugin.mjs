#!/usr/bin/env zx

import { spinner } from "zx/experimental";
// const prompts = require("prompts");

console.log(chalk.green("Create new plugin"));
const inputName = await question("Please input your new plugin name:");
const description = await question("Please input your new plugin description:");

const dirname = inputName || "PluginName";
const template = "templates/new-plugin";
const target = "dev/plugins/" + dirname;

await spinner("Loading ...", async () => {
  // await $`cp -r ${template} ${target}`;
  await $`echo HEllo`;
  // await $`sed -i "s#PluginName#${inputName}#g" ${target}/**.tid`;
  // maybe use js to replace sed
});

console.log(chalk.green("ending"));
