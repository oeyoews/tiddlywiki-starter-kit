import chalk from 'chalk';
import { exec } from 'child_process';

export function checkGitInstallation() {
  exec('git --version', (error, stdout, stderr) => {
    if (error) {
      chalk.red('Git 不存在或未安装，请先安装 Git');
      return;
    }
  });
}
