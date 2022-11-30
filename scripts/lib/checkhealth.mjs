#!/usr/bin/env zx

function exitWithError(errorMessage) {
  console.error(chalk.red(errorMessage));
  // process.exit(1);
}

// just support linux currently
function checkPlatform(platform) {
  const currentplatform = os.platform();
  if (currentplatform !== platform.toLowerCase()) {
    exitWithError(`current platform is => ${currentplatform}, not ${platform}`);
  } else {
    console.log(chalk.green(`🐧 current platform is ${currentplatform}`));
  }
}

async function checkRequireProgrammsExist(programms) {
  try {
    for (let program of programms) {
      await which(program);
    }
  } catch (e) {
    exitWithError(`😱 Required command ${e.message}`);
  }
}

const checkhealth = {
  checkPlatform,
  checkRequireProgrammsExist,
};

export default checkhealth;
