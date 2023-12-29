/*\
title: $:/plugins/oeyoews/translate/translate.js
type: application/javascript
module-type: library

\*/

const translate = require('./translate.min.js');
const story = new $tw.Story();

// TODO: support cn <--> zh on viewtoolbar
// TODO: support translate english title
// TODO: add notify
// TODO: 遇到 `#` 会报错.

module.exports = async function (title) {
  const type = $tw.wiki.getTiddler(title).fields.type;
  const content = $tw.wiki.getTiddlerText(title);
  // rendertext/rendertiddler 会渲染出多余的模板代码. 直接加载 原型上的md, 也是这样, 需要直接加载vanilla md
  // 也有bug
  // const MarkdownIt = require('$:/plugins/tiddlywiki/markdown/markdown-it.js');
  // const md = new MarkdownIt();

  const nprogress = $tw.NProgress;

  nprogress.start();

  try {
    const translatedTitle = await translate(title, 'zh');
    const newTitle =
      String(translatedTitle).toLocaleLowerCase() === title.toLocaleLowerCase()
        ? title + '-cn'
        : translatedTitle;
    // NOTE: 似乎每次的翻译内容不会100%保持一致, 所以无法防止多次重复翻译
    // 需要检查 english title to cn title, 的tiddler 是否存在过
    if ($tw.wiki.tiddlerExists(newTitle)) {
      console.warn(newTitle, ' 条目已存在');
      story.navigateTiddler(newTitle);
      nprogress.done();
      return false;
    }
    const text = await translate(content, 'zh');
    $tw.wiki.addTiddler({
      title: newTitle,
      text,
      type
    });

    // 添加字段, 为模板数据做准备
    // $tw.wiki.setText(title, 'cn', null, newTitle, {
    //   suppressTimestamp: true
    // });
    // $tw.wiki.setText(newTitle, 'en', null, title, {
    //   suppressTimestamp: true
    // });
    story.navigateTiddler(newTitle);
    nprogress.done();
    $tw.Confetti.pretty();
  } catch (e) {
    console.warn(e);
    nprogress.done();
  }
};
