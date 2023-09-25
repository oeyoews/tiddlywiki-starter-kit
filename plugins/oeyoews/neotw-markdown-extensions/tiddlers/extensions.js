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

  function createContainerConfig(name, label, color) {
    return {
      marker: ':',
      render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
          // TODO: support details
          /* const spaceIndex = name.indexOf(' ');
          const title = spaceIndex !== -1 ? name.slice(spaceIndex + 1) : ''; */
          return (
            `<div class="border border-y-0 border-r-0 border-l-4 border-s-${color}-400 rounded-l-md my-2">\n` +
            `<div class="font-bold bg-${color}-200 text-${color}-600 px-2 py-1 rounded-t-sm">${label} ${name}</div>` +
            `<div class="content pl-2 shadow-sm rounde-md py-1 bg-${color}-200">`
          );
        } else {
          return '</div>\n</div>\n';
        }
      },
    };
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function loadIcons(icon) {
    return $tw.wiki.getTiddlerText(
      '$:/plugins/oeyoews/neotw-markdown-extensions/icons/' + icon,
    );
  }

  function LoadExtensions() {
    const md = $tw.Wiki.parsers['text/markdown'].prototype.md;

    const emoji = require('./markdown-it-emoji');
    const toc = require('./markdown-it-toc');
    const task = require('./markdown-it-task');
    const abbr = require('./markdown-it-abbr');
    const smartarrows = require('./markdown-it-smartarrows');
    // https://github.com/silvandiepen/markdown-it-alert
    const containerPlugin = require('./markdown-it-container');
    const containers = [
      { name: 'success', label: '✅', color: 'green' },
      { name: 'todo', label: '✅', color: 'green' },
      { name: 'warning', label: '⚠️', color: 'yellow' },
      { name: 'note', label: '📝', color: 'yellow' },
      { name: 'error', label: '❌', color: 'red' }, //  ❎
      { name: 'tips', label: '💡', color: 'blue' },
      { name: 'info', label: '💡', color: 'blue' },
      { name: 'tada', label: loadIcons('tada'), color: 'blue' },
      { name: '', label: '🍉', color: 'purple' },
      { name: 'fire', label: '🔥', color: 'blue' },
      { name: 'sparkles', label: loadIcons('sparkles'), color: 'blue' },
    ];

    md.use(emoji).use(toc).use(task).use(abbr).use(smartarrows);

    containers.forEach((container) => {
      const { name, label, color } = container;
      const config = createContainerConfig(name.toUpperCase(), label, color);
      md.use(containerPlugin, name.toLowerCase(), config);
      md.use(
        containerPlugin,
        capitalizeFirstLetter(name.toLowerCase()),
        config,
      );
      md.use(containerPlugin, name.toUpperCase(), config);
    });
    // console.log('🎉 LoadExtensions');
  }

  /* function LoadEmoji() {
    window.emoji = require('./markdown-it-emoji');
  } */

  exports.name = 'markdown-extension-startup-hook';
  exports.platforms = ['browser'];
  exports.before = ['story'];
  exports.synchronous = true;
  exports.startup = LoadExtensions;
})();
