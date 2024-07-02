import fs from 'fs';
import path from 'path';
import useId from './useId.mjs';
import config from '../../config/index.mjs';

const { username, pluginversion } = config;

/**
 * @description 递归读取文件, 并且批量替换pluginname
 * @param directoryPath 目录
 * @param replaceString 替换字符串
 */
export default function traverseFiles(directoryPath, replaceString) {
  fs.readdir(directoryPath, (err, filesAndDirectories) => {
    filesAndDirectories.forEach((item) => {
      const itemPath = path.join(directoryPath, item);
      fs.stat(itemPath, (err, stats) => {
        if (stats.isFile()) {
          let content = fs.readFileSync(itemPath, 'utf8');
          content = content
            .replace(/\$\{pluginname\}/g, replaceString)
            .replace(
              /\{\{ created \}\}/g,
              new Date().toISOString().split('T')[0],
            )
            .replace(/\{\{ widget_name \}\}/g, `widget-${useId}`)
            .replace(/\{\{ tw_version \}\}/g, pluginversion)
            .replace(/\{\{ plugin_author \}\}/g, username);
          fs.writeFileSync(itemPath, content);
        } else if (stats.isDirectory()) {
          traverseFiles(itemPath, replaceString); // Recursively call to handle subdirectories
        }
      });
    });
  });
}
