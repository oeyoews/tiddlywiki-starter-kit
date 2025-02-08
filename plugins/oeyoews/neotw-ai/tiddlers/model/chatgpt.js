/*\
title: $:/plugins/oeyoews/neotw-ai/model/chatgpt.js
type: application/javascript
module-type: library

chatgpt以及兼容chatgpt
\*/

/**
 * chatgpt
 * @param {Object} data - data
 * @param {string} data.baseurl - baseurl
 * @param {string} data.content - content
 * @param {string} data.model - model
 * @param {string} data.apiKey - model
 */
async function chatgpt(data) {
  const baseurl = data.baseurl;
  const url = `${baseurl}/v1/chat/completions`;

  const models = {
    gpt4: 'gpt-4',
    gpt35: 'gpt-3.5-turbo',
  };

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${data.apiKey}`,
    },
    body: JSON.stringify({
      model: data.model || models.gpt35,
      stream: false,
      messages: [{ role: 'user', content: data.content }],
    }),
  };

  try {
    const res = await fetch(url, options);
    const stream = await res.json();
    if (!stream?.data && !stream?.choices) {
      console.error(stream?.message);
    }
    return stream.choices?.[0]?.message.content;
  } catch (e) {
    console.error(e);
  }
}

module.exports = chatgpt;
