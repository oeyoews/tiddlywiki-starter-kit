$.verbose = false;

import { cyan, blue, yellow, bold, dim, green } from 'kolorist';
import prompts from 'prompts';
import replace from 'replace';
import signale from 'signale';
import msg from '../lib/info.mjs';
import base from '../lib/base.mjs';

export default async function newPlugin() {
  const template = 'templates/new-plugin';
  const questions = [
    {
      type: 'text',
      name: 'pluginname', // variable
      message: 'create plugin',
      initial: 'pluginname',
    },
    {
      type: 'text',
      name: 'description', // variable
      message: 'plugin description', // not support sed space
      initial: '',
    },
    {
      type: 'toggle',
      name: 'newPluginStatus',
      message: 'Are you sure to Create this new plugin',
      initial: true,
      inactive: 'no',
      active: 'yes',
    },
  ];

  // get answer
  let { newPluginStatus, pluginname, description } = await prompts(questions);

  if (newPluginStatus) {
    await $`rm -rf plugins/pluginname*`;
    // ???
    pluginname = pluginname.trim().replace(/\s+/g, '-');
    const upperpluginname = base.titleCase(
      pluginname.trim().replace(/-/g, ' '),
    );
    description =
      base.titleCase(description.trim().replace(/-/g, ' ')) || upperpluginname;
    const target = 'plugins/oeyoews/' + pluginname;

    // TODO
    if (fs.existsSync(target)) {
      console.log(
        chalk.red.bold(
          `Plugin directory '${target}' already exists. Aborting.`,
        ),
      );
      return;
    }

    await $`mkdir ${target} && cp -r ${template}/* ${target}`;

    const { username } = os.userInfo();
    const regexPlace = {
      upperpluginname,
      pluginname,
      description,
      username,
    };

    for (let i in regexPlace) {
      replace({
        regex: new RegExp('\\$\\{' + i + '\\}', 'g'),
        replacement: regexPlace[i],
        paths: [target],
        recursive: true,
        silent: true,
      });
    }
  } else {
    console.log(chalk.yellow('🍃 I can see the first leaf falling.'));
  }
}
