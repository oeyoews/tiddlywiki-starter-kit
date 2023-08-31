import fs from "fs";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import prompts from "prompts";
import { validateNpmName } from "./vaildate-pkg";
import { notifyUpdate } from "./update-check";

// @ts-ignore
import tiged from "tiged";

const spinner = ora("Loading ...");

export default async function createApp() {
  await notifyUpdate();
  const user = "Jermolene";
  const repo = "TiddlyWiki5";
  const edition = "server";
  const tiddlywikiInfo = `${user}/${repo}/editions/${edition}/tiddlywiki.info`;
  const { template } = await prompts({
    type: "select",
    name: "template",
    message: "Select template",
    choices: [{ title: edition, value: `app/${edition}` }],
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
    initial: tiddlywikiInfo,
  });
  if (!projectName) process.exit(0);

  targetDir = projectName.trim();

  const { confirm } = await prompts({
    type: "confirm",
    name: "confirm",
    message: `Do you want to clone ${template}?`,
  });

  // 仓库路径
  const emitter = tiged(tiddlywikiInfo, {
    disableCache: true,
    force: true,
    verbose: false,
  });

  confirm &&
    spinner.start() &&
    // 仓库克隆到本地的路径
    emitter.clone(targetDir).then(() => {
      spinner.succeed(chalk.green(`Cloned ${edition} to ${targetDir}`));
      spinner.succeed(
        chalk.cyan(`cd ${targetDir} && pnpm install && pnpm dev`)
      );
      process.exit(0);
    });
}
