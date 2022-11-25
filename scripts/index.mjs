#!/usr/bin/env zx

// question event

import prompts from 'prompts'
import build from './build.mjs'
import start from './start.mjs'

const questions = [
  {
    type: 'select',
    name: 'guide',
    message: 'guide',
    choices: ['build', 'start'].map((i) => ({ value: i, title: i })),
    initial: 0
  }
]

const response = await prompts(questions)

function main (callback) {
  callback()
}

main(response.guide)
