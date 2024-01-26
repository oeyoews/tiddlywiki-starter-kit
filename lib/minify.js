const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const ci = require('ci-info');

const currentDir = path.join(__dirname, '..', 'plugins/oeyoews');

const options = {
  toplevel: true,
  compress: {
    global_defs: {
      // '@console.log': 'alert'
    },
    passes: 2
  },
  format: {
    comments: '/title|type|module-type/'
  }
};

// NOTE: muse use async
module.exports = async function minifyFilesRecursively(directory = currentDir) {
  if (!ci.isCI) {
    console.log('跳过Minify');
    return;
  }
  const files = fs.readdirSync(directory);
  files.forEach(async (file) => {
    const filePath = path.join(directory, file);
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      minifyFilesRecursively(filePath); // 如果是文件夹，则递归调用
    } else if (path.extname(file) === '.js' && !file.endsWith('.min.js')) {
      console.log('Begin Minify ...', filePath);
      const originalCode = fs.readFileSync(filePath, 'utf8');
      const result = await minify(originalCode, options);
      fs.writeFileSync(filePath, result.code);
    }
  });
};
