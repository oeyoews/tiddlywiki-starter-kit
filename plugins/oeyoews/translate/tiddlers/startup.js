/*\
title: $:/plugins/oeyoews/translate/startup.js
type: application/javascript
module-type: startup

translate startup

\*/

exports.name = 'translate-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const translate = require('./translate.min.js');
  const story = new $tw.Story();
  // TODO: support cn <--> zh on viewtoolbar
  $tw.rootWidget.addEventListener('om-translate-tiddler', async (event) => {
    const title = event.tiddlerTitle;
    // TODO: support translate english title
    const type = $tw.wiki.getTiddler(title).fields.type;
    const content = $tw.wiki.getTiddlerText(title);
    const nprogress = new $tw.NProgress();

    nprogress.start();

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
      type,
      translate: 'yes',
    });

    // 添加字段, 为模板数据做准备
    $tw.wiki.setText(title, 'cn', null, newTitle, {
      suppressTimestamp: true,
    });
    $tw.wiki.setText(newTitle, 'en', null, title, {
      suppressTimestamp: true,
    });
    story.navigateTiddler(newTitle);
    // TODO: add notify
    nprogress.done();
  });
};
