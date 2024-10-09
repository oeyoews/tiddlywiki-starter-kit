/*\
title: $:/plugins/oeyoews/neotw-ai/model/siliconflow.js
type: application/javascript
module-type: library

\*/

// ai: https://docs.siliconflow.cn/reference/chat-completions-1

/**
 * siliconfolw
 * @param {Object} data - data
 * @param {string} data.content - content
 * @param {string} data.model - model
 * @param {string} data.apiKey - model
 */
async function siliconflow(data) {
  const url = 'https://api.siliconflow.cn/v1/chat/completions';

  const models = {
    qw72: 'Qwen/Qwen2-72B-Instruct',
    qw110: 'Qwen/Qwen1.5-110B-Chat',
  };

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${data.apiKey}`,
    },
    body: JSON.stringify({
      model: models.qw110,
      stream: false,
      messages: [{ role: 'user', content: data.content }],
    }),
  };

  try {
    const res = await fetch(url, options);
    const stream = await res.json();
    return stream.choices?.[0]?.message.content;
  } catch (e) {
    console.error(e);
  }
}

module.exports = siliconflow;
