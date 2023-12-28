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
  const { md } = $tw.Wiki.parsers['text/markdown'].prototype;

  const getname = (name) => `./markdown-it-${name}`;

  const extensions = [
    'abbr',
    'emoji',
    'github-alert',
    'pangu',
    'smartarrows',
    'front-matter'
  ];

  extensions.forEach((extension) => {
    md.use(require(getname(extension)));
  });
};
