import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
// @ts-ignore
import spawn from 'cross-spawn';
import prompts from 'prompts';
import { validateNpmName } from './vaildate-pkg';
// import { notifyUpdate } from './update-check';
import { randomSixLetters } from './randomSixLetters';
import { onPromptState } from './onPromptState';
import { version } from '../package.json'

import { getPkgManager } from './get-pkg-manager';

export default async function createApp() {
  // await notifyUpdate();
  const spinner = ora('Creating project...');
  let targetDir: string;
  const defaultPackageManager = getPkgManager();

  const { projectName } = await prompts({
    onState: onPromptState,
    type: 'text',
    name: `projectName`,
    message: `Your New TiddlyWiki Project Name (${version})`,
    validate: (value) => {
      const validation = validateNpmName(path.basename(path.resolve(value)));
      if (!validation.valid) {
        return 'Invalid project name: ' + validation.problems![0];
      }
      if (fs.existsSync(value)) {
        return `${value} already exists`;
      }
      return true;
    },
    initial: `tw-app-${randomSixLetters}`,
  });

  targetDir = projectName.trim();

  const allPackManagers = ['npm', 'yarn', 'pnpm', 'bun'];
  const choices = allPackManagers.map((pm) => ({
    title: pm,
    value: pm,
    selected: defaultPackageManager === pm,
    description: defaultPackageManager === pm ? 'Default' : '',
  }));

  const { packageManager } = await prompts({
    onState: onPromptState,
    type: 'select',
    name: 'packageManager',
    message: 'Select manager',
    choices,
    initial: 0,
  });

  const versionChoices = ['latest', '5.3.3', '5.2.7', 'other'];

  /* const { askedVersion } = await prompts({
    onState: onPromptState,
    type: "toggle",
    name: "askedVersion",
    message: "Use prerelease?",
    active: "yes",
    inactive: "no",
    initial: false,
  });

  let commit: string;
  if (askedVersion) {
    // remove all warnings(because fetch is experimental api)
    process.removeAllListeners("warning");

    commit = await getLatestCommit();
    console.log(commit);
    if (commit) {
      versionChoices.unshift("prerelease");
    }
  } */
  // console.log(JSON.stringify(versionChoices, null, 2));

  // @ts-ignore
  let { tiddlywikiPackage } = await prompts({
    onState: onPromptState,
    type: 'select',
    choices: versionChoices.map((v) => ({
      title: v,
      value: `tiddlywiki@${v}`,
      /* v === "prerelease"
          ? `github:Jermolene/TiddlyWiki5#${commit}`
          : `tiddlywiki@${v}`, */
    })),
    name: 'tiddlywikiPackage',
    message: `select tiddlywiki version`,
    initial: 0,
  });

  if (tiddlywikiPackage === 'tiddlywiki@other') {
    const { otherTiddlyWikiPackage } = await prompts({
      onState: onPromptState,
      type: 'text',
      name: 'otherTiddlyWikiPackage',
      message: `Enter version`,
      initial: '5.3.3',
      validate: (input) => {
        const versionPattern = /^\d+\.\d+\.\d+$/; // 正则表达式模式
        if (versionPattern.test(input)) {
          return true; // 验证通过
        } else {
          return '输入值必须是 x.x.x 数字格式'; // 验证失败时返回错误消息
        }
      },
    });
    tiddlywikiPackage = `tiddlywiki@${otherTiddlyWikiPackage}`;
  }

  /* const { installLanguage } = await prompts({
    onState: onPromptState,
    type: "toggle",
    name: "installLanguage",
    message: "Do you want to install extra language packages?",
    active: "yes",
    inactive: "no",
    initial: false,
  });

  // TODO 支持多选
  let installLanguageNames: string | undefined;
  if (installLanguage) {
    const { installLanguageName } = await prompts({
      onState: onPromptState,
      type: "select",
      choices: [
        { title: "简体中文", value: "zh-Hans" },
        {
          title: "English",
          value: "en",
          disabled: true,
        },
      ],
      name: "installLanguageName",
      message: "Enter language name",
    });
    installLanguageNames = installLanguageName;
  } */

  const { confirm } = await prompts({
    onState: onPromptState,
    type: 'confirm',
    name: 'confirm',
    message: `Create ${targetDir} ?`,
  });

  const templateDir = path.join(__dirname, 'template');

  if (confirm) {
    spinner.start();
    fs.mkdirSync(targetDir);
    await Promise.all([
      fs.copyFileSync(
        path.join(templateDir, 'package.json'),
        `${targetDir}/package.json`,
      ),
      fs.copyFileSync(
        path.join(templateDir, 'tiddlywiki.info'),
        `${targetDir}/tiddlywiki.info`,
      ),
    ]);

    /* if (installLanguage) {
      const infoFilePath = `${targetDir}/tiddlywiki.info`;
      const configFile = fs.readFileSync(infoFilePath, "utf-8");
      const config = JSON.parse(configFile);
      config.languages = [installLanguageNames];
      const updatedConfig = JSON.stringify(config, null, 2);
      fs.writeFileSync(infoFilePath, updatedConfig, "utf8");
    } */

    const child = spawn(packageManager, ['install', tiddlywikiPackage], {
      // stdio: "inherit", // ignore
      cwd: targetDir,
      env: {
        // NODE_NO_WARNINGS: 1,
      },
    });

    child.on('error', (err: Error) => {
      console.error(chalk.red.bold(`[Error]: ${err.message}`));
    });

    child.on('close', (code: number) => {
      if (code !== 0) {
        spinner.fail(chalk.red.bold('Failed to install packages'));
      }
      spinner.succeed(chalk.green.bold('Packages installed\n'));
      spinner.succeed(
        chalk.cyan.bold(
          'cd ' +
          chalk.yellow.underline(targetDir) +
          ' && ' +
          packageManager +
          ' run start\n',
        ),
      );
    });
  }
}
