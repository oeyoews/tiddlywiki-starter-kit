#!/usr/bin/env zx

import prompts from "prompts";
import { spinner } from "zx/experimental";
import { cyan, blue, yellow, bold, dim, green } from "kolorist";

console.log(`  ${cyan("●") + blue("■") + yellow("▲")}`);

const bin = "tiddlywiki";
const questions = [
  {
    type: "toggle",
    name: "isBuild",
    message: "Are you sure to build ?",
    initial: true,
    inactive: "no",
    active: "yes",
  },
];

const response = await prompts(questions);
const output = response.output;
const setup = response.setup;
const passwd = response.password;

if (response.isBuild) {
  await spinner("Building ...", async () => {
    await $`rm -rf ${output}`; // clean
    if (setup) {
      await $`${bin} --output ${output} --password ${passwd} --build index `; // use vanilla replace --build
    } else {
      await $`${bin} --output ${output} --build index`; // use vanilla replace --build
    }
  });
  console.log(chalk.green("🎉 Building finished"));
}
