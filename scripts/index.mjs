#!/usr/bin/env zx

import prompts from "prompts";
import msg from "./info.mjs";
import bump from "./bump.mjs";
import build from "./build.mjs";
import start from "./start.mjs";
import service from "./service.mjs";

const index = {
  service,
  build,
  start,
  bump,
};

$.verbose = false;

const choicesNeotw = ["service", "build", "start", "bump"];

// hello
msg.info();

const questions = [
  {
    type: "select",
    name: "guide",
    message: "guide",
    choices: choicesNeotw.map((i) => ({ value: i, title: i })),
    initial: 0,
  },
];

const response = await prompts(questions);
const fn = response.guide;

// user sure
/**
 * @param {any} callback
 */

async function main(callback) {
  await index[callback]();
}

/*  */
main(fn);
