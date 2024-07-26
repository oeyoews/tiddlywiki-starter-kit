/*\
title: $:/plugins/oeyoews/neotw-vue3/getTemplate.js
type: application/javascript
module-type: library

\*/

/**
 * Retrieves the content of a template file and returns it as a string.
 *
 * @param {string} file - The name of the template file to retrieve.
 * @return {string|undefined} The content of the template file, trimmed of leading and trailing whitespace.  Returns undefined if the template file is not found.
 */
const getTemplate = (file) => {
  const ext = '.vue';
  const pluginPrefix = '$:/plugins/';

  if (!file.endsWith(ext)) return;

  let filename = file;
  if (!file.startsWith(pluginPrefix)) {
    filename = pluginPrefix + file;
  }

  // 获取 vue 模板字符串
  let template = $tw.wiki.getTiddlerText(filename)?.trim();
  if (!template) {
    console.error(`[neotw-vue3] Template file "${filename}" not found.`);
    return;
  }

  // 移除 <template> 标签
  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

module.exports = getTemplate;
