$.verbose = false;

import prompts from 'prompts';
import replace from 'replace';
import titleCase from './base.mjs';

async function newPlugin() {
  const template = 'templates/new-plugin';
  const questions = [
    {
      type: 'text',
      name: 'pluginname', // variable
      message: 'create plugin',
      initial: 'pluginname',
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
  let { newPluginStatus, pluginname } = await prompts(questions);

  if (newPluginStatus) {
    await $`rm -rf plugins/pluginname*`;
    // ???
    pluginname = pluginname.trim().replace(/\s+/g, '-');
    const upperpluginname = titleCase(pluginname.trim().replace(/-/g, ' '));
    const target = 'plugins/oeyoews/' + pluginname;

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

newPlugin();
