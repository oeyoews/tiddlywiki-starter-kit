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
    let tiddlers = [];
    console.info('Begin import markdown tiddlers ...');
    const content = await readMarkdownFolder();
    const confirmRes = window.confirm(
      `Are you confirm import ${content.length} markdown tiddlers?`,
    );
    if (!confirmRes) return;
    content.forEach((content) => {
      let renameTitle = null;
      if (
        $tw.wiki.filterTiddlers(`[[${content.title}]!is[missing]]`).length > 0
      ) {
        renameTitle = window.prompt(
          `${content.title} tiddler has exist, please rename this tiddler`,
          content.title + '-' + Date.now(),
        );
        // 跳过此条目的导入
        if (!renameTitle) {
          return;
        }
      }
      if (renameTitle) {
        content.title = renameTitle;
      }
      $tw.wiki.addTiddler({
        tags: ['markdown'],
        type: 'text/markdown',
        ...content,
      });
      tiddlers.push(content.title);
    });
    // 写入导入记录tiddler
    const markdownImporterRecord = '_state-markdown-importer-' + Date.now();
    $tw.wiki.addTiddler({
      title: markdownImporterRecord,
      text:
        `You have imported @@color:green;${tiddlers.length}@@ markdown tiddlers !\n\n` +
        tiddlers
          .map((tiddler, index) => `${index + 1}. [[${tiddler}]]\n\n`)
          .join(''),
    });

    const goto = new $tw.Story();
    goto.navigateTiddler(markdownImporterRecord);
  });
};

{
  /* <$button
  class="tc-btn-invisible recommend-tiddler-ai data-html2canvas-ignore"
  message="th-markdown-importer"
>Importer</$button>; */
}
