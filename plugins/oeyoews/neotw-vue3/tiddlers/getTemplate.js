/*\
title: $:/plugins/oeyoews/neotw-vue3/getTemplate.js
type: application/javascript
module-type: library

\*/

const getTemplate = (file) => {
  let template = $tw.wiki.getTiddlerText(file)?.trim();
  if (!template) {
    console.error(`[neotw-vue3] Template file "${file}" not found.`);
    return;
  }

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

module.exports = getTemplate;
