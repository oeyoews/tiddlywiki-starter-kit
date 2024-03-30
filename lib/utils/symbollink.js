// TEST
const fs = require('fs-extra');
const path = require('path');

// use vscode to exec directly
const srcPath = path.join(__dirname, '../../', 'subwiki');
const destPath = path.join(__dirname, '../..', 'src/tiddlers', 'subwiki');

// With a callback:
fs.ensureSymlink(srcPath, destPath, (err) => {
  err && console.log(err); // => null
  // symlink has now been created, including the directory it is to be placed in
});

// With Promises:
fs.ensureSymlink(srcPath, destPath)
  .then(() => {
    console.log('success!');
  })
  .catch((err) => {
    console.error(err);
  });

// With async/await:
async function example(src, dest) {
  try {
    await fs.ensureSymlink(src, dest);
    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}

example(srcPath, destPath);
