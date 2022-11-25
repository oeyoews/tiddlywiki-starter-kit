#!/usr/bin/env zx

// https://bobbyhadz.com/blog/javascript-export-class
import { cyan, blue, yellow } from 'kolorist'
import signale from 'signale'

const { description, version, name } = require('../package.json')
const log = console.log

signale.config({
  // displayFilename: true,
  // displayTimestamp: true,
  // displayDate: true,
})

/* info */
const msg = {
  // time
  currentDate: () => console.log(new Date()),

  // info
  info: () => {
    // log("");
    log(
      `${cyan('●') + blue('■') + yellow('▲')}` +
        chalk.blue.bold(` ${name}: `) +
        chalk.blue.cyan(` ${description} (${version}): `)
    )
  },

  // finish
  finish: (text = 'Operation successful') => {
    signale.success(text)
  }
}

export default msg
