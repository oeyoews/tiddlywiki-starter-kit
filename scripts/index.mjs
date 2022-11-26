#!/usr/bin/env zx

$.verbose = false;

import prompts from "prompts";
import index from "./main.mjs";

const choicesNeotw = ["service", "build", "start"];

// WIP TODO
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
function main(callback) {
  index[callback]();
}

/*  */
main(fn);
