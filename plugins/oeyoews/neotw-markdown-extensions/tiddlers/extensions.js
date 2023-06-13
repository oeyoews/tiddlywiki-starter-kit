/*\
title: $:/plugins/oeyoews/neotw-markdown-extensions/extensions.js
type: application/javascript
module-type: startup

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
    const abbr = require('./markdown-it-abbr');
    const containerPlugin = require('./markdown-it-container');
    const containers = [
      { name: 'success', label: '✅ Success', color: 'green' },
      { name: 'todo', label: '✅ TODO', color: 'green' },
      { name: 'warning', label: '⚠️  Warning', color: 'yellow' },
      { name: 'note', label: '📚 Note', color: 'yellow' },
      { name: 'error', label: '❌ Error', color: 'red' },
      { name: 'tips', label: '💡 Tips', color: 'blue' },
    ];

    md.use(emoji).use(toc).use(task).use(abbr);

    containers.forEach(container => {
      const { name, label, color } = container;
      const config = createContainerConfig(label, color);
      md.use(containerPlugin, name, config);
    });
    // console.log('🎉 LoadExtensions');
  }

  /* function LoadEmoji() {
    window.emoji = require('./markdown-it-emoji');
  } */

  exports.name = 'markdown-extension-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = LoadExtensions;
  // exports.startup = LoadEmoji;
})();
