#!/usr/bin/env zx

// enable quiet mode
$.verbose = false;

// https://github.com/terkelg/prompts#readme
import { spinner } from "zx/experimental";
import { cyan, blue, yellow, bold, dim, green } from "kolorist";
import prompts from "prompts";
import replace from "replace";
import signale from "signale";
import msg from "./info.mjs";
import base from "./base.mjs";

msg.info();

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
    initial: "plugin description",
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

if (response.newPluginStatus) {
  const template = "templates/new-plugin";
  const pluginName = response.pluginName.trim().replace(/\s+/g, "-");
  const upperPluginName = base.titleCase(
    response.pluginName.trim().replace(/-/g, " ")
  ); // no need trim whitespace
  const description =
    base.titleCase(response.description.trim().replace(/-/g, " ")) ||
    upperPluginName;
  const target = "dev/plugins/" + pluginName;

  await $`rm -rf dev/plugins/PluginName*`;
  await $`mkdir ${target} && cp -r ${template}/* ${target}`;

  const regexPlace = {
    // string: var
    // TODO: rename these var, need notice order
    UpperPluginName: upperPluginName,
    PluginName: pluginName,
    Description: description,
  };

  for (let i in regexPlace) {
    replace({
      regex: i,
      replacement: regexPlace[i],
      paths: [target],
      recursive: true,
      silent: true,
    });
  }
  msg.finish(`${pluginName} has created`);
} else {
  console.log(chalk.yellow("🍃 I can see the first leaf falling."));
}
