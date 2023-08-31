import fs from "fs";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import prompts from "prompts";
import { validateNpmName } from "./vaildate-pkg";
import checkForUpdate from "update-check";
import packageJson from "./package.json";

// @ts-ignore
import tiged from "tiged";

const spinner = ora("Loading ...");

const update = checkForUpdate(packageJson).catch(() => null);

async function notifyUpdate(): Promise<void> {
  try {
    const res = await update;
    if (res?.latest) {
      console.log(
        chalk.yellow(
          chalk.bold("🚀 A new version of `create-next-app` is available!")
        ) +
          "\n" +
          "You can update by running: " +
          chalk.cyan("pnpm dlx create-next-app@latest") +
          "\n"
      );
    } else {
      console.log(
        chalk.green(
          `🎉 ${packageJson.name} is up to date ${packageJson.version}\n`
        )
      );
    }
    // process.exit(0);
  } catch {}
}

export default async function createApp() {
  await notifyUpdate();
  const user = "oeyoews";
  const repo = "tiddlywiki-starter-kit";
  const initial = `${user}/${repo}`;
  const { template } = await prompts({
    type: "select",
    name: "template",
    message: "Select template",
    choices: [{ title: initial, value: initial }],
  });
  if (!template) process.exit(0);
  let targetDir: string;
  const { projectName } = await prompts({
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
    initial,
  });
  if (!projectName) process.exit(0);

  targetDir = projectName.trim();

  const { confirm } = await prompts({
    type: "confirm",
    name: "confirm",
    message: `Do you want to clone ${template}?`,
  });

  // 仓库路径
  const emitter = tiged(initial, {
    disableCache: true,
    force: true,
    verbose: false,
  });

  confirm &&
    spinner.start() &&
    // 仓库克隆到本地的路径
    emitter.clone(targetDir).then(() => {
      spinner.succeed(chalk.green(`Cloned ${initial} to ${targetDir}`));
      spinner.succeed(
        chalk.cyan(`cd ${targetDir} && pnpm install && pnpm dev`)
      );
      process.exit(0);
    });
}
