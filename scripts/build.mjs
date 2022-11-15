#!/usr/bin/env zx

import prompts from "prompts";
import { spinner } from "zx/experimental";

// With a message.
// await spinner(" ", () => $`make build`);

const bin = "tiddlywiki";
const questions = [
  {
    type: "select",
    name: "output",
    message: "output dir",
    choices: [
      {
        title: "Vanilla",
        description: "default",
        value: "output",
      },
      { title: "Custom", description: "custom", value: "custom" },
    ],
    initial: 0,
  },
  {
    type: (prev) => (prev == "custom" ? "text" : null),
    name: "output",
    message: "custom output",
  },
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

if (response.isBuild) {
  await spinner("Building ...", async () => {
    await $`rm -rf ${output}`; // clean
    await $`${bin} --output ${output} --build index`; // use vanilla replace --build
  });
}
