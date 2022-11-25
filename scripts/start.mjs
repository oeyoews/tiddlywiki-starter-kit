#!/usr/bin/env zx

// enable quiet mode
import { spinner } from 'zx/experimental'
import prompts from 'prompts'
import open from 'open' // https://www.npmjs.com/package/open
import {
  getPortPromise,
  getPort,
  setBasePort,
  setHighestPort
} from 'portfinder' // https://github.com/http-party/node-portfinder
import msg from './info.mjs'

$.verbose = false

setBasePort(8080) // default: 8000
setHighestPort(8888) // default: 65535

const bin = 'tiddlywiki'
const questions = [
  {
    type: 'select',
    name: 'port',
    message: 'port',
    choices: [
      {
        title: 'Vanilla',
        description: 'default',
        value: '8080'
      },
      { title: 'Random', value: 'random', disabled: false },
      { title: 'Custom', description: 'custom', value: 'custom' }
    ],
    initial: 0
  },
  {
    type: (prev) => (prev == 'custom' ? 'text' : null),
    name: 'port',
    message: 'custom port'
  },
  {
    type: 'toggle',
    name: 'isStart',
    message: 'Are you sure open on browser ?',
    initial: true,
    inactive: 'no',
    active: 'yes'
  }
]

const response = await prompts(questions)
const openUrl = 'http:/localhost:' + response.port

if (response.isStart) {
  msg.info()
  if (response.port == 'random') {
    getPort(function (err, port) {
      const openUrl = 'http:/localhost:' + port
      $`npx ${bin} --listen port=${port} 2>&1`
      spinner('Loading ...', async () => {
        await $`sleep 0.7`
        await open(openUrl)
      })
    })
  } else {
    $`npx ${bin} --listen port=${response.port} 2>&1`
    await spinner('Loading ...', async () => {
      await $`sleep 0.7`
      await open(openUrl)
    })
  }
  msg.finish()
}
