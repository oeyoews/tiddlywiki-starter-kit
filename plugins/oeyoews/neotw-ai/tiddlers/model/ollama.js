/*\
title: $:/plugins/oeyoews/neotw-ai/model/ollama.js
type: application/javascript
module-type: library

ollama-with-deepseek-r1
\*/

/**
 * ollama
 * @param {Object} data - data
 * @param {string} data.content - content
 */
async function ollama(data) {
  const baseurl = 'http://localhost:11434';
  const url = `${baseurl}/api/chat`;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      stream: false,
      // model: 'deepseek-r1:1.5b',
      model: 'qwen2:0.5b', // 效果不够稳定, 勉强做个标题优化助手, 性能要求不高， 最普通的笔电也很快
      messages: [
        { role: 'user', content: data.content },
        // {
        //   role: 'system',
        //   content: '不要输出双引号',
        // },
        // {
        //   role: 'system',
        //   content:
        //     '请阅读并总结日记，适当使用emoji，使用富有意境和哲理的文人语气，简体中文输出, 输出尽量简洁扼要， 不要换行，不要带有\n',
        // },
      ],
    }),
  };

  try {
    const res = await fetch(url, options);
    if (res.status !== 200) {
      window.alert('请求出错');
      throw new Error('请求出错');
    }
    const stream = await res.json();
    // error log
    return stream.message.content.replace(/<think>[\s\S]*?<\/think>/g, '');
  } catch (e) {
    console.error(e);
  }
}

module.exports = ollama;
