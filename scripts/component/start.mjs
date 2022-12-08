import { spinner } from 'zx/experimental';
import prompts from 'prompts';
import open from 'open'; // https://www.npmjs.com/package/open
import {
  getPortPromise,
  getPort,
  setBasePort,
  setHighestPort,
} from 'portfinder'; // https://github.com/http-party/node-portfinder

setBasePort(8080); // default: 8000
setHighestPort(8888); // default: 65535

export default async function start() {
  const questions = [
    {
      type: 'select',
      name: 'port',
      message: 'port',
      choices: [
        {
          title: 'Vanilla',
          description: 'default',
          value: '8080',
        },
        { title: 'Random', value: 'random', disabled: false },
        { title: 'Custom', description: 'custom', value: 'custom' },
      ],
      initial: 0,
    },
    {
      type: prev => (prev == 'custom' ? 'text' : null),
      name: 'port',
      message: 'custom port',
    },
    {
      type: 'toggle',
      name: 'isStart',
      message: 'Are you sure open on browser ?',
      initial: true,
      inactive: 'no',
      active: 'yes',
    },
  ];

  const response = await prompts(questions);
  const openUrl = 'http:/localhost:' + response.port;

  if (response.isStart) {
    const bin = 'tiddlywiki';
    if (response.port == 'random') {
      getPort(function(err, port) {
        const openUrl = 'http:/localhost:' + port;
        $`npx ${bin} --listen port=${port} 2>&1`;
        spinner('Loading ...', async () => {
          await $`sleep 0.7`;
          await open(openUrl);
        });
      });
    } else {
      $`npx ${bin} --listen port=${response.port} 2>&1`;
      await spinner('Loading ...', async () => {
        await $`sleep 0.7`;
        await open(openUrl);
      });
    }
  }
}
