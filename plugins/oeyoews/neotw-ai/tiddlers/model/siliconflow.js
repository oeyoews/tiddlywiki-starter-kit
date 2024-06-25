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
    qw: 'Qwen/Qwen2-72B-Instruct',
  };
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${data.apiKey}`,
    },
    body: JSON.stringify({
      model: models.qw,
      stream: false,
      messages: [{ role: 'user', content: data.content }],
    }),
  };

  const res = await fetch(url, options);
  const stream = await res.json();
  return stream.choices[0].message.content;
}

module.exports = siliconflow;
