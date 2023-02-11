import prompts from 'prompts';
import { spinner } from 'zx/experimental';

export default async function clone() {
  const subwikiAddress = 'https://gitlab.com/oeyoews/subwiki.git';
  const tidgiArch = 'ssh://aur@aur.archlinux.org/tidgi.git';
  const dev = 'dev';
  // const newDIr = "dev/plugins/neotw/tiddlers/**.tid";
  // let packages = await glob([newDIr]);

  // Object ?
  const questions = [
    {
      type: 'autocomplete',
      name: 'installRepoName',
      message: 'install package',
      choices: [
        {
          title: 'Subwiki',
          description: 'install repo ' + subwikiAddress,
          value: subwikiAddress,
        },
        {
          title: 'tidgi arch package',
          description: 'Tidgi' + tidgiArch,
          value: tidgiArch,
        },
      ],
      initial: 0,
    },
    {
      type: 'toggle',
      name: 'isClone',
      message: 'Are you sure to clone this repo?',
      initial: true,
      active: 'yes',
      inactive: 'no',
    },
  ];

  const response = await prompts(questions);
  const installRepoName = response.installRepoName;
  const isClone = response.isClone;

  if (isClone) {
    await spinner('Cloning ...', async () => {
      cd(dev);
      await $`git clone --depth 1 ${installRepoName}`;
    });
  } else {
    echo('🍃 I can see the first leaf falling.');
  }
}
