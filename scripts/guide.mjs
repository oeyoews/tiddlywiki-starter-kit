#!/usr/bin/env zx

import ora from 'ora';
import prompts from 'prompts';
import newPlugin from './component/new-plugin.mjs';

// $.verbose = false;

const spinner = ora('Waiting ...');

const index = {
  newPlugin,
};

// from ob to arroy
const choicesNeotw = Object.keys(index);

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
  spinner.succeed('Done');
}

/*  */
main(fn).catch(e => {
  // console.log(e);
});
