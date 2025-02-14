/*\
title: $:/plugins/oeyoews/neotw-ai/rename-hook.js
type: application/javascript
module-type: widget

neotw-ai rename

// TOOD: 批量rename, 根据title重新命名/ 或者根据内容重新命名(费token)
\*/

const { getRenameTitle } = require('./prompt.js');

const aiModels = require('./model/index');
const config = require('./config.js');

async function renameTiddlerTitle(title) {
  if (!title) {
    const tip = '请输入标题';
    console.warn(tip);
    window.alert(tip);
    return;
  }
  if (!navigator.onLine) {
    const tip = '当前网络异常';
    console.warn(tip);
    window.alert(tip);
    return;
  }

  if (!config.API_KEY) {
    window.alert('请填写你的 apikey');
  }

  const renameTitle = await aiModels['ollama']({
    // baseurl: config.CHATGPT_PROXY_URL || 'https://api.openai.com',
    // apiKey: config.API_KEY,
    content: getRenameTitle(title),
    // content: getRenameTitle(title),
  });

  if (renameTitle) {
    const to = window.prompt('Rename to:', renameTitle);
    if (to) {
      $tw.wiki.renameTiddler(title, to);
    }
  }
}
module.exports = renameTiddlerTitle;
