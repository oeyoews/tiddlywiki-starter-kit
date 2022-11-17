#!/usr/bin/env zx

import prompts from "prompts";
import { spinner } from "zx/experimental";

const questions = [
  {
    type: "select",
    name: "indexEvent",
    message: "event",
    choices: [
      {
        title: "info",
        description: "info",
        value: "info",
      },
      {
        title: "new-plugin",
        description: "new-plugin ",
        value: "new-plugin",
      },
    ],
    initial: 0,
  },
  {
    type: "toggle",
    name: "isSure",
    message: "Are you sure ?",
    initial: true,
    active: "yes",
    inactive: "no",
  },
];

const response = await prompts(questions);
const isSure = response.isSure;
const indexEvent = response.indexEvent;

if (isSure) {
  await $`npx zx scripts/${indexEvent}.mjs`;
}
