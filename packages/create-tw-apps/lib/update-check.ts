import checkForUpdate from 'update-check';
import chalk from 'chalk';
import packageJson from '.././package.json';

export async function notifyUpdate(): Promise<void> {
  try {
    const res = await checkForUpdate(packageJson, {
      interval: 24 * 60 * 60 * 1000,
      distTag: 'latest',
    });
    console.log(
      chalk.green(
        res?.latest
          ? `📦 A new version of ${packageJson.name}  is available! ${packageJson.version} → ${res?.latest}`
          : `🎉 ${packageJson.name} is up to date ${packageJson.version}\n`,
      ),
    );
    // process.exit(0);
  } catch {}
}
