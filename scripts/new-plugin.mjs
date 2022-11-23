#!/usr/bin/env zx

// enable quiet mode
$.verbose = false;

// https://github.com/terkelg/prompts#readme
import { spinner } from "zx/experimental";
import { cyan, blue, yellow, bold, dim, green } from "kolorist";
import prompts from "prompts";
import replace from "replace";
import { info, finish } from "./info.mjs";
import signale from "signale";

info();

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

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

const response = await prompts(questions);
const template = "templates/new-plugin";
const pluginName = response.pluginName.trim().replace(/\s+/g, "-");
const upperPluginName = titleCase(
  response.pluginName.trim().replace(/-/g, " ")
); // no need trim whitespace
const description =
  titleCase(response.description.trim().replace(/-/g, " ")) || upperPluginName;
const replacePluginName = "PluginName";
const replaceDes = "Description";
const target = "dev/plugins/" + pluginName;

if (response.newPluginStatus) {
  await $`rm -rf dev/plugins/PluginName*`;
  await $`mkdir ${target} && cp -r ${template}/* ${target}`;
  replace({
    regex: "UpperPluginName",
    replacement: upperPluginName,
    paths: [target],
    recursive: true,
    silent: true,
  });
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
  finish(`${pluginName} has created`);
} else {
  console.log(chalk.yellow("😭 Maybe something wrong"));
}
