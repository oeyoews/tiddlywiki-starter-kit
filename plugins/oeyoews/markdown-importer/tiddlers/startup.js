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
    // 不支持移动端
    if (
      window.navigator.userAgent.match(/Android|iPhone|iPad|iPod|Mobile|webOS/i)
    ) {
      alert('此功能暂不支持移动端');
      return;
      // throw new Error('移动端暂不支持此功能');
    }
    let tiddlers = [];
    console.info('Begin import markdown tiddlers ...');
    const content = await readMarkdownFolder();
    // TODO: 进度条
    if (content.length === 0) {
      alert('No markdown tiddlers found');
      return;
    }
    const confirmRes = window.confirm(
      `Are you confirm import ${content.length} markdown tiddlers?`,
    );
    // TODO: 导入数量过多会导致卡顿
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
        title: content.title,
        ...content,
        type: 'text/markdown', // 放到最后面， 防止frontmatter 修改
      });
      tiddlers.push(content.title);
    });
    // 写入导入记录tiddler
    const markdownImporterRecord = '_state-markdown-importer-' + Date.now();
    let defaultText = `You have imported @@color:green;${tiddlers.length}@@ markdown tiddlers !`;

    if (tiddlers.length <= 100) {
      defaultText +=
        `(only show the first ${tiddlers.length} markdown tiddlers)\n\n` +
        tiddlers
          .map((tiddler, index) => `${index + 1}. [[${tiddler}]]\n\n`)
          .join('');
    }

    $tw.wiki.addTiddler({
      title: markdownImporterRecord,
      text: defaultText,
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
