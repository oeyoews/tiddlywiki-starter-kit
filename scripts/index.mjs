#!/usr/bin/env zx

import prompts from "prompts";
import msg from "./info.mjs";
import bump from "./bump.mjs";
import build from "./build.mjs";
import start from "./start.mjs";
import service from "./service.mjs";
import newPlugin from "./new-plugin.mjs";
import checkneotw from "./checkneotw.mjs";
import clone from "./clone.mjs";

$.verbose = false;

const index = {
  service,
  checkneotw,
  build,
  start,
  bump,
  newPlugin,
  clone,
};

// from ob to arroy
const choicesNeotw = Object.keys(index);

// hello
msg.info();

const questions = [
  {
    type: "autocomplete", // not support use esc to exist
    name: "guide",
    message: "guide",
    choices: choicesNeotw.map((i) => ({ value: i, title: i })),
    clearFirst: true,
  },
];

// begin question
const response = await prompts(questions);
const fn = response.guide;

/**
 * @param {any} callback
 */
async function main(callback) {
  await index[callback]();
}

/*  */
main(fn).catch((e) => {
  // msg.fatal(e);
});
