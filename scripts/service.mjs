#!/usr/bin/env zx

// enable quiet mode
import prompts from 'prompts'
import { spinner } from 'zx/experimental'
import msg from './info.mjs'

$.verbose = false

const serviceFile = 'neotw-user.service'

msg.info()

const questions = [
  {
    type: 'select',
    name: 'serviceEvent',
    message: 'event',
    choices: [
      'restart',
      'stop',
      'status',
      'start',
      'stop',
      'disable',
      'enable',
      'reload'
    ].map((i) => ({ value: i, title: i })),
    initial: 0
  },
  {
    type: 'toggle',
    name: 'isSure',
    message: 'Are you sure ?',
    initial: true,
    active: 'yes',
    inactive: 'no'
  }
]

const response = await prompts(questions)
const isSure = response.isSure
const serviceEvent = response.serviceEvent

if (isSure) {
  if (serviceEvent == 'reload') {
    await spinner('Cloning ...', async () => {
      await $`systemctl --user daemon-reload`
      console.log(chalk.green(`${serviceEvent}`))
    })
  }

  if (serviceEvent !== 'reload') {
    await spinner('Cloning ...', async () => {
      await $`systemctl --user ${serviceEvent} ${serviceFile}`
      msg.finish() // todo
    })
  } else {
    echo('🍃 I can see the first leaf falling.')
  }
}
