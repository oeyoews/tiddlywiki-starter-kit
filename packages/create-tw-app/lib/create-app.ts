import fs from "fs";
import path from "path";
import ora from "ora";
import chalk from "chalk";
// @ts-ignore
import spawn from "cross-spawn";
import prompts from "prompts";
import { validateNpmName } from "./vaildate-pkg";
import { notifyUpdate } from "./update-check";
import { randomSixLetters } from "./randomSixLetters";
import { onPromptState } from "./onPromptState";

// @ts-ignore
import tiged from "tiged";
import { getPkgManager } from "./get-pkg-manager";

const spinner = ora("Loading ...");

export default async function createApp() {
  await notifyUpdate();

  let targetDir: string;
  const defaultPackageManager = getPkgManager();
  // console.log(defaultPackageManager, typeof defaultPackageManager);

  const { projectName } = await prompts({
    onState: onPromptState,
    type: "text",
    name: "projectName",
    message: "Project name",
    validate: (value) => {
      const validation = validateNpmName(path.basename(path.resolve(value)));
      if (!validation.valid) {
        return "Invalid project name: " + validation.problems![0];
      }
      if (fs.existsSync(value)) {
        return `${value} already exists`;
      }
      return true;
    },
    initial: `app-${randomSixLetters}`,
  });

  targetDir = projectName.trim();

  const allPackManagers = ["pnpm", "yarn", "npm"];
  const choices = allPackManagers.map((pm) => ({
    title: pm,
    value: pm,
    selected: defaultPackageManager === pm,
    description: defaultPackageManager === pm ? "Default" : "",
  }));

  const { packageManager } = await prompts({
    onState: onPromptState,
    type: "select",
    name: "packageManager",
    message: "Select package manager",
    choices,
    initial: 0,
  });

  const { confirmInstallPackage } = await prompts({
    onState: onPromptState,
    type: "toggle",
    active: "yes",
    inactive: "no",
    name: "confirmInstallPackage",
    message: `Do you want to install packages now?`,
    initial: false,
  });

  const { confirm } = await prompts({
    onState: onPromptState,
    type: "confirm",
    name: "confirm",
    message: `Do you want to create ${targetDir} directory ?`,
  });

  if (confirm) {
    fs.mkdirSync(targetDir);
    fs.copyFileSync("./template/package.json", `${targetDir}/package.json`);
    fs.copyFileSync(
      "./template/tiddlywiki.info",
      `${targetDir}/tiddlywiki.info`
    );

    spinner.succeed(
      chalk.cyan.bold(`\ncd ${targetDir} && ${packageManager} run start \n`)
    );
  } else return;

  confirmInstallPackage &&
    (await spawn(packageManager, ["install"], {
      stdio: "inherit",
      cwd: targetDir,
    })) &&
    spinner.info(chalk.green.bold("Packages installing ...\n")) &&
    spinner.succeed(
      chalk.cyan.bold(`cd ${targetDir} && ${packageManager} run start \n`)
    );
}
