/*\
title: $:/plugins/oeyoews/markdown-extensions-startup/startup.js
type: application/javascript
module-type: startup

markdown-extensions-startup widget
\*/

exports.name = 'markdown-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;

exports.startup = () => {
  const md = $tw.Wiki.parsers['text/markdown']?.prototype.md;
  if (!md) return;

  if (!md) {
    return;
  }

  // load markdownit modules
  const modules = $tw.modules.types['markdownit'];
  if (!modules) return;
  const req = Object.getOwnPropertyNames(modules);

  if (req) {
    if ($tw.utils.isArray(req)) {
      req.forEach((item) => {
        // TODO: how to load markdown plugins options
        md.use(require(item));
      });
    } else {
      md.use(require(req));
    }
  }
};
