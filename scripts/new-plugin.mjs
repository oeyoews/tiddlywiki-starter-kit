#!/usr/bin/env zx

// import "zx/globals";

// https://github.com/terkelg/prompts#readme
import { spinner } from "zx/experimental";
const prompts = require("prompts");
const timestamp = new Date().getTime();

const questions = [
  {
    type: "text",
    name: "dirname", // variable
    message: "create dirname",
    initial: "PluginName-" + timestamp,
  },
  {
    type: "text",
    name: "description", // variable
    message: "description",
    initial: "description",
  },
  {
    type: "select",
    name: "PluginName",
    message: "Which part do you want to bump? ",
    choices: [
      {
        title: "newPluginName1: ",
        description: "This option has a description",
      },
      {
        title: "Red",
        description: "This option has a description",
        value: "#ff0000",
      },
      { title: "Green", value: "#00ff00", disabled: true },
    ],
  },
  {
    type: "toggle",
    name: "newPluginStatus",
    message: "Can you confirm?",
    initial: false,
    active: "yes",
    inactive: "no",
  },
];

// clean
await $`rm -rf dev/plugins/PluginName*`;

const response = await prompts(questions);

const template = "templates/new-plugin";
const target = "dev/plugins/" + response.dirname;

const newPluginDir = await spinner("Loading ...", async () => {
  await $`mkdir ${target} && cp -r ${template}/* ${target} || exit`;
  await $`sleep 1`;
  // await $`sed -i "s#PluginName#${inputName}#g" ${target}/**.tid`;
});

if (response.newPluginStatus) {
  newPluginDir;
  console.log(chalk.green("finished"));
} else {
  console.log(chalk.yellow("nothing to do"));
}
