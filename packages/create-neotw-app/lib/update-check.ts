import checkForUpdate from "update-check";
import chalk from "chalk";
import packageJson from ".././package.json";
const update = checkForUpdate(packageJson).catch(() => null);

export async function notifyUpdate(): Promise<void> {
  try {
    const res = await update;
    console.log(
      chalk.green(
        res?.latest
          ? `📦 A new version of ${packageJson.name}  is available! ${packageJson.version} → ${res?.latest}`
          : `🎉 ${packageJson.name} is up to date ${packageJson.version}\n`
      )
    );
    // process.exit(0);
  } catch {}
}