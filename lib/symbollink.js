// TEST
const fs = require('fs-extra');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'README.md');
const destPath = path.join(__dirname, '..', 'test', 'readme.md');

// With a callback:
fs.ensureSymlink(srcPath, destPath, (err) => {
  console.log(err); // => null
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
