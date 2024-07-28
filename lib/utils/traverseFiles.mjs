import config from '../../config/index.mjs';
import useId from './useId.mjs';
import fs from 'fs';
import path from 'path';

const { username, pluginversion } = config;

/**
 * @description 递归读取文件, 并且批量替换pluginname
 * @param {string} directoryPath  目录
 * @param {string} pluginname 插件名
 */

function processTemplate(contentPath, pluginname) {
  let content = fs.readFileSync(contentPath, 'utf8');
  const created = new Date().toISOString().split('T')[0].replace('-', '/');
  const variables = {
    pluginname,
    created,
    widget_name: `widget-${useId}`,
    tw_version: pluginversion,
    plugin_author: username,
  };

  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{ ${key} \\}\\}`, 'g');
    content = content.replace(regex, value);
  });
  fs.writeFileSync(contentPath, content);
}

export default function traverseFiles(directoryPath, pluginname) {
  fs.readdir(directoryPath, (err, filesAndDirectories) => {
    filesAndDirectories.forEach((item) => {
      const itemPath = path.join(directoryPath, item);
      fs.stat(itemPath, (err, stats) => {
        if (stats.isFile()) {
          processTemplate(itemPath, pluginname);
        } else if (stats.isDirectory()) {
          traverseFiles(itemPath, pluginname);
        }
      });
    });
  });
}
