#!/usr/bin/env zx

import prompts from "prompts";
import msg from "./info.mjs";
import bump from "./bump.mjs";
import build from "./build.mjs";
import start from "./start.mjs";
import service from "./service.mjs";
import newPlugin from "./new-plugin.mjs";
import checkhealth from "./checkhealth.mjs";
import clone from "./clone.mjs";

$.verbose = false;

const platform = checkhealth.platform;
const index = {
  service,
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
    type: "autocomplete",
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
if (platform === "linux") {
  main(fn).catch((e) => {
    msg.fatal(e);
  });
}
