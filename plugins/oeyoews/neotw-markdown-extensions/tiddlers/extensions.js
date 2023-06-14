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
            `<div class="border border-y-0 border-r-0 border-l-4 border-s-${color}-400 rounded-l-md my-2">\n` +
            `<div class="font-bold bg-${color}-200 text-${color}-600 px-2 py-1 rounded-t-sm">${type}</div>` +
            '<div class="content pl-2 shadow-sm rounde-md">'
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
      { name: 'note', label: '📝 Note', color: 'yellow' },
      { name: 'error', label: '❌ Error', color: 'red' }, //  ❎
      { name: 'tips', label: '💡 Tips', color: 'blue' },
      { name: 'info', label: '💡 Info', color: 'blue' },
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
  exports.before = ['story'];
  exports.after = ['startup'];
  exports.synchronous = true;
  exports.startup = LoadExtensions;
  // exports.startup = LoadEmoji;
})();
