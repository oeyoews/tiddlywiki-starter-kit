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
  // TODO: support cn <--> zh
  $tw.rootWidget.addEventListener('om-translate-tiddler', async (event) => {
    const title = event.tiddlerTitle;
    const newTitle = title + '-cn';
    const content = $tw.wiki.getTiddlerText(title);
    const text = await translate(content, 'zh');
    // NOTE: 似乎每次的翻译内容不会100%保持一致, 所以无法防止多次重复翻译
    $tw.wiki.addTiddler({
      title: newTitle,
      text,
      translate: yes,
    });
    const story = new $tw.Story();
    story.navigateTiddler(newTitle);
    // TODO: add notify
  });
};
