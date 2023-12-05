/*\
title: $:/plugins/oeyoews/neotw-markdown-extensions/extensions.js
type: application/javascript
module-type: startup

Extension markdown-it
\*/

exports.name = 'markdown-extension-startup-hook';
exports.platforms = ['browser'];
exports.before = ['render'];
exports.after = ['startup'];
exports.synchronous = true;

exports.startup = () => {
  const md = $tw.Wiki.parsers['text/markdown'].prototype.md;

  const emoji = require('./markdown-it-emoji');
  const abbr = require('./markdown-it-abbr');
  const smartarrows = require('./markdown-it-smartarrows');
  const githubAlert = require('./markdown-it-github-alert');

  md.use(emoji).use(abbr).use(smartarrows).use(githubAlert);
};
