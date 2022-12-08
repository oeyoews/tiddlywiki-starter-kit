import prompts from 'prompts';
import { spinner } from 'zx/experimental';

export default async function build() {
  const questions = [
    {
      type: 'select',
      name: 'output',
      message: 'output',
      choices: [
        {
          title: 'Vanilla',
          description: 'default',
          value: 'output',
        },
        { title: 'Custom', description: 'custom', value: 'custom' },
      ],
      initial: 0,
    },
    {
      type: prev => (prev == 'custom' ? 'text' : null),
      name: 'output',
      message: 'custom output',
    },
    {
      type: 'select',
      name: 'setup',
      message: 'Are you sure to set passwd ?',
      choices: [
        {
          title: 'yes',
          description: 'set TiddlyWiki password',
          value: 'yes',
        },
        { title: 'no', value: 'no' },
      ],
      initial: 1,
    },
    {
      type: prev => (prev == 'yes' ? 'password' : null),
      name: 'password',
      message: 'custom password',
    },
    {
      type: 'toggle',
      name: 'isBuild',
      message: 'Are you sure to build ?',
      initial: true,
      inactive: 'no',
      active: 'yes',
    },
  ];

  const response = await prompts(questions);
  const output = response.output || 'public';
  const setup = response.setup;
  const passwd = response.password || 'password';

  if (response.isBuild) {
    const bin = 'tiddlywiki';
    await spinner('Building ...', async () => {
      await $`rm -rf ${output}`; // clean
      if (setup === 'yes') {
        await $`npx ${bin} --output ${output} --password ${passwd} --build index `; // use vanilla replace --build
      } else {
        await $`npx ${bin} --output ${output} --build index`; // use vanilla replace --build
      }
    });
  }
}
