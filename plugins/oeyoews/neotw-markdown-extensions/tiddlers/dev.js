/*\
title: $:/plugins/oeyoews/neotw-markdown-extensions/dev.js
type: application/javascript
// module-type: parser

Extension markdown-it

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  function createContainerConfig(type, color) {
    return {
      render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
          return (
            `<div class="rounded-md border-left border-l-4 px-1 my-2 bg-${color}-100 border-${color}-500 text-${color}-700">\n` +
            `<div class="font-bold">${type}</div>` +
            '<div class="content">'
          );
        } else {
          return '</div>\n</div>\n';
        }
      },
    };
  }

  function LoadExtensions() {
    const md = $tw.Wiki.parsers['text/markdown'].prototype.md;
    const emoji = require('./markdown-it-emoji');
    const toc = require('./markdown-it-toc');
    const task = require('./markdown-it-task');
    const containerPlugin = require('./markdown-it-container');
    md.use(emoji).use(toc).use(task);

    const containers = [
      { name: 'todo', label: '✅ 任务', color: 'green' },
      { name: 'warning', label: '注意', color: 'yellow' },
      { name: 'info', label: '提示', color: 'blue' },
      { name: 'error', label: '警告', color: 'red' },
    ];

    containers.forEach(container => {
      const { name, label, color } = container;
      const config = createContainerConfig(label, color);
      md.use(containerPlugin, name, config);
    });
  }
  exports['type/markdown'] = LoadExtensions;
})();
