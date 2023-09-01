import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";
// @ts-ignore
import spawn from "cross-spawn";
import prompts from "prompts";
import { validateNpmName } from "./vaildate-pkg";
import { notifyUpdate } from "./update-check";
import { randomSixLetters } from "./randomSixLetters";
import { onPromptState } from "./onPromptState";

import { getPkgManager } from "./get-pkg-manager";

export default async function createApp() {
  await notifyUpdate();

  const spinner = ora("Creating project...");
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

  const { version } = await prompts({
    onState: onPromptState,
    type: "select",
    choices: ["latest", "5.3.0", "5.2.0"].map((v) => ({
      title: v,
      value: v,
    })),
    name: "version",
    message: `select tiddlywiki version`,
    initial: 0,
  });

  const { confirm } = await prompts({
    onState: onPromptState,
    type: "confirm",
    name: "confirm",
    message: `Do you want to create ${targetDir} directory ?`,
  });

  const templateDir = path.join(__dirname, "template");
  if (confirm) {
    spinner.start();
    fs.mkdirSync(targetDir);
    fs.copyFileSync(
      path.join(templateDir, "package.json"),
      `${targetDir}/package.json`
    );
    fs.copyFileSync(
      path.join(templateDir, "tiddlywiki.info"),
      `${targetDir}/tiddlywiki.info`
    );

    const child = spawn(packageManager, ["install", `tiddlywiki@${version}`], {
      stdio: "ignore",
      cwd: targetDir,
    });

    child.on("close", (code: number) => {
      if (code === 0) {
        spinner.succeed(chalk.green.bold("Packages installed\n"));
        spinner.succeed(
          chalk.cyan.bold(`cd ${targetDir} && ${packageManager} run start \n`)
        );
      }
    });
  }
}
