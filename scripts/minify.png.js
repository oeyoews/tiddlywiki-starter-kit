const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const chalk = require('chalk');

// just fit pngquant-bin

const directoryPaths = ['files', 'img', 'tiddlers/binary']; // 修改为你的图片目录路径，可以是一个数组

directoryPaths.forEach(directoryPath => {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log(
        chalk.red(`Unable to scan directory ${directoryPath}: ${err}`),
      );
    }
    files.forEach(function (file) {
      const filePath = path.join(directoryPath, file);
      if (fs.statSync(filePath).isFile() && path.extname(filePath) === '.png') {
        exec(
          `npx pngquant 64 --skip-if-larger --ext=.png --force "${filePath}"`,
          (err, stdout, stderr) => {
            if (err) {
              console.error(chalk.red(`Error executing pngquant: ${err}`));
              return;
            }
            console.log(chalk.green(`Optimized ${filePath} with pngquant`));
            // Uncomment the following line to use zopflipng
            // exec(`zopflipng -y "${filePath}" "${filePath}"`, (err, stdout, stderr) => {
            //   if (err) {
            //     console.error(`Error executing zopflipng: ${err}`);
            //     return;
            //   }
            //   console.log(`Optimized ${filePath} with zopflipng`);
            // });
          },
        );
      }
    });
  });
});
