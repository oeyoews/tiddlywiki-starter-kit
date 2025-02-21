/*\
title: $:/plugins/oeyoews/markdown-importer/startup.js
type: application/javascript
module-type: startup

markdown-importer startup

\*/

exports.name = 'markdown-importer-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const readMarkdownFolder = require('./importer');
  $tw.rootWidget.addEventListener('th-markdown-importer', async (event) => {
    const content = await readMarkdownFolder();
    content.forEach((content) => {
      let renameTitle = null;
      if (
        $tw.wiki.filterTiddlers(`[[${content.title}]!is[missing]]`).length > 0
      ) {
        renameTitle = window.prompt(
          `${content.title} tiddler has exist, please rename this tiddler`,
          content.title + '-' + Date.now(),
        );
      }
      if (renameTitle) {
        content.title = renameTitle;
      }
      $tw.wiki.addTiddler({
        tags: ['markdown'],
        type: 'text/markdown',
        ...content,
      });
    });
  });
};

{
  /* <$button
  class="tc-btn-invisible recommend-tiddler-ai data-html2canvas-ignore"
  message="th-markdown-importer"
>Importer</$button>; */
}
