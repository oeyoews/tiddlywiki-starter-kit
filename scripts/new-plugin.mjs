#!/usr/bin/env zx

// import "zx/globals";

// https://github.com/terkelg/prompts#readme
import { spinner } from "zx/experimental";
const prompts = require("prompts");
const timestamp = new Date().getTime();

const questions = [
  {
    type: "text",
    name: "PluginName", // variable
    message: "create plugin",
    initial: "PluginName-" + timestamp,
  },
  {
    type: "text",
    name: "description", // variable
    message: "description",
    initial: "description",
  },
  {
    type: "toggle",
    name: "newPluginStatus",
    message: "Can you confirm?",
    initial: true,
    inactive: "no",
    active: "yes",
  },
];

// clean
await $`rm -rf dev/plugins/PluginName*`;

const response = await prompts(questions);

const template = "templates/new-plugin";
const newPluginName = response.PluginName;
const target = "dev/plugins/" + newPluginName;
const replaceStr = "PluginName";

const newPluginDir = await spinner("Loading ...", async () => {
  // const files = await $`grep ${replaceStr} ${target} -rl | tr '\n' ' '`;
  // await $`sed -i "s#PluginName#${newPluginName}#g" ${files}`;
  await $`mkdir ${target} && cp -r ${template}/* ${target} || exit`;
  await $`sed -i "s#${replaceStr}#${newPluginName}#g" ${target}/**.info ${target}/**/*.tid ${target}/*.tid`;
});

if (response.newPluginStatus) {
  newPluginDir;
  console.log(chalk.green("finished"));
} else {
  console.log(chalk.yellow("nothing to do"));
}
