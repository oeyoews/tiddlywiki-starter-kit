/*\
title: $:/plugins/oeyoews/neotw-ai/recommendTag.js
type: application/javascript
module-type: library

tag 推荐
// 仅仅推荐仅含有 剪藏 的标签
\*/

const { getRecommendTag } = require('./prompt.js');

const aiModels = require('./model/index');
const config = require('./config.js');

async function getRecommendTagHook(title) {
  const progress = $tw.NProgress;
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
  progress.start();

  const allTags = $tw.wiki.filterTiddlers('[tags[]!prefix[$:/]]');
  const renameTitle = await aiModels['chatgpt']({
    baseurl: config.CHATGPT_PROXY_URL || 'https://api.openai.com',
    apiKey: config.CHATGPT_API_KEY,
    // baseurl: 'http://localhost:11434',
    // model: 'qwen2:0.5b',
    content: getRecommendTag(title, allTags),
  });

  if (renameTitle) {
    progress.done();
    const to = window.prompt('Rename to:', renameTitle);
    if (to) {
      // tw 返回的是一个不可变对象数组
      const tags = [...$tw.wiki.getTiddler(title).fields.tags] || [];
      tags.push(to);
      $tw.wiki.setText(title, 'tags', null, tags);
    }
  }
}
module.exports = getRecommendTagHook;
