#!/usr/bin/env zx

// https://github.com/terkelg/prompts#readme
import { spinner } from "zx/experimental";
import { cyan, blue, yellow, bold, dim, green } from "kolorist";
import prompts from "prompts";
import replace from "replace";

console.log(`${cyan("●") + blue("■") + yellow("▲")}`);

const timestamp = new Date().getTime();

const questions = [
  {
    type: "text",
    name: "pluginName", // variable
    message: "create plugin",
    initial: "PluginName-" + timestamp,
  },
  {
    type: "text",
    name: "description", // variable
    message: "plugin description", // not support sed space
    initial: "description",
  },
  {
    type: "toggle",
    name: "newPluginStatus",
    message: "Are you sure to Creat this new plugin",
    initial: true,
    inactive: "no",
    active: "yes",
  },
];

const response = await prompts(questions);
const template = "templates/new-plugin";
const description = response.description;
const pluginName = response.pluginName;
const replacePluginName = "PluginName";
const replaceDes = "Description";
const target = "dev/plugins/" + pluginName;

if (response.newPluginStatus) {
  await spinner("Loading ...", async () => {
    // const files = await $`grep ${replaceStr} ${target} -rl | tr '\n' ' '`;
    // await $`sed -i "s#PluginName#${newPluginName}#g" ${files}`;
    // await $`sed -i "s#${replaceStr}#${newPluginName}#g" ${target}/**.info ${target}/**/*.tid ${target}/*.tid`;
    // await $`sed -i "s#${oldDescription}#${newPluginName}#g" ${target}/**.info ${target}/**/*.tid ${target}/*.tid`;
    await $`rm -rf dev/plugins/PluginName*`;
    await $`mkdir ${target} && cp -r ${template}/* ${target}`;
    // pluginname
    replace({
      regex: replacePluginName,
      replacement: pluginName,
      paths: [target],
      recursive: true,
      silent: true,
    });
    // description
    replace({
      regex: replaceDes,
      replacement: description,
      paths: [target],
      recursive: true,
      silent: true,
    });
  });
  console.log(chalk.green("🎉 You have created new plugin in"), target);
} else {
  console.log(chalk.yellow("😭 Maybe something wrong"));
}
