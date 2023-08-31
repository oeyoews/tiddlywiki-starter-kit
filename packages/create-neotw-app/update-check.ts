import checkForUpdate from "update-check";
import chalk from "chalk";
import packageJson from "./package.json";
const update = checkForUpdate(packageJson).catch(() => null);

export async function notifyUpdate(): Promise<void> {
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