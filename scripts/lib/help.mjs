#!/usr/bin/env zx

function exitWithError(errorMessage) {
  console.error(chalk.red(errorMessage));
  process.exit(1);
}

let targetDirectory = argv.directory;
if (!targetDirectory) {
  exitWithError("Error: You must specify the --directory argument");
}
