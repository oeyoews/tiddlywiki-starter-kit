#!/usr/bin/env zx

const directoryPaths = ['files', 'img'];

directoryPaths.forEach(async directoryPath => {
  const files = await $`find ${directoryPath} -name "*.png"`;
  files.stdout
    .trim()
    .split('\n')
    .forEach(async file => {
      await $`pngquant 64 --skip-if-larger --ext=.png --force ${file}`;
      console.log(`Optimized ${filePath} with pngquant`);
    });
});
