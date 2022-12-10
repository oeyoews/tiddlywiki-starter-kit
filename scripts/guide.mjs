#!/usr/bin/env zx

import prompts from 'prompts';
import msg from './lib/info.mjs';
import service from './component/service.mjs';
import build from './component/build.mjs';
import start from './component/start.mjs';
import bump from './component/bump.mjs';
import newPlugin from './component/new-plugin.mjs';
import clone from './component/clone.mjs';

$.verbose = false;

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
    type: 'autocomplete', // not support use esc to exist
    name: 'guide',
    message: 'guide',
    choices: choicesNeotw.map(i => ({ value: i, title: i })),
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
main(fn).catch(e => {
  // console.log(e);
});
