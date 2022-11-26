#!/usr/bin/env zx

$.verbose = false;

import prompts from "prompts";
import index from "./main.mjs";
import msg from "./info.mjs";

const choicesNeotw = ["service", "build", "start"];

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
