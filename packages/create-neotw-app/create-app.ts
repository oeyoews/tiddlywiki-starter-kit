import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';
import prompts from 'prompts';

// @ts-ignore
import tiged from 'tiged';

const spinner = ora('Loading ...');

export default async function createApp() {
  const user = 'oeyoews';
  const repo = 'tiddlywiki-starter-kit';
  const initial = `${user}/${repo}`;
  const { template } = await prompts({
    type: 'select',
    name: 'template',
    message: 'Select template',
    choices: [{ title: initial, value: initial }],
  });
  if (!template) process.exit(0);
  let targetDir: string;
  const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'Project name',
    validate: value => {
      if (fs.existsSync(value)) {
        return `${value} already exists`;
      }
      return true;
    },
    initial,
  });
  if (!projectName) process.exit(0);

  targetDir = projectName.trim();

  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `Do you want to clone ${template}?`,
  });

  const emitter = tiged(initial, {
    disableCache: true,
    force: true,
    verbose: false,
  });

  confirm &&
    spinner.start() &&
    emitter.clone(template).then(() => {
      spinner.succeed(chalk.green(`Cloned ${initial} to ${targetDir}`));
      spinner.succeed(
        chalk.cyan(`cd ${targetDir} && pnpm install && pnpm dev`),
      );
      process.exit(0);
    });
}
