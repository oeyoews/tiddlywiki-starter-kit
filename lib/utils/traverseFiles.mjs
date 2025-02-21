import config from '../../config/index.mjs';
import useId from './useId.mjs';
import fs from 'fs';
import path from 'path';

const { username, pluginversion } = config;

function toPascalCase(str) {
  return str
    .replace(/-./g, (x) => x[1].toUpperCase())
    .replace(/^[a-z]/, (x) => x.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Replaces template placeholders in a file with provided plugin information.
 *
 * This function reads the content of a file specified by `contentPath`,
 * and replaces any placeholders in the format `{{ key }}` with corresponding
 * values from an object containing plugin-related data such as the plugin name,
 * creation date, widget name, TiddlyWiki version, and plugin author.
 * The updated content is then written back to the same file.
 *
 * @param {string} contentPath - The path to the file containing template placeholders.
 * @param {string} pluginname - The name of the plugin to be used in replacements.
 */
function processTemplate(contentPath, pluginname) {
  let content = fs.readFileSync(contentPath, 'utf8');
  const created = new Date().toISOString().split('T')[0].replaceAll('-', '');
  const variables = {
    pluginname,
    created,
    widget_name: `widget-${useId}`,
    WidgetName: toPascalCase(pluginname) + 'Widget',
    tw_version: pluginversion,
    plugin_author: username,
  };

  Object.entries(variables).forEach(([key, value]) => {
    if (key == 'WidgetName') {
      content = content.replaceAll('WidgetName', value);
    }
    const regex = new RegExp(`\\{\\{ ${key} \\}\\}`, 'g');
    content = content.replace(regex, value);
  });
  fs.writeFileSync(contentPath, content);
}

/**
 * @description 递归读取文件, 并且批量替换pluginname
 * @param {string} directoryPath  目录
 * @param {string} pluginname 插件名
 */
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
