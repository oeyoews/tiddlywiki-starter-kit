#!/usr/bin/env zx

import prompts from "prompts";
import msg from "./info.mjs";
import bump from "./bump.mjs";
import build from "./build.mjs";
import start from "./start.mjs";
import service from "./service.mjs";
import newPlugin from "./new-plugin.mjs";

$.verbose = false;

const index = {
  service,
  build,
  start,
  bump,
  newPlugin,
};

// from ob to arroy
const choicesNeotw = Object.keys(index);

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

// TODO: error
/**
 * @param {any} callback
 */
async function main(callback) {
  await index[callback]();
}

/*  */
main(fn).catch((e) => {
  msg.fatal(e);
});
