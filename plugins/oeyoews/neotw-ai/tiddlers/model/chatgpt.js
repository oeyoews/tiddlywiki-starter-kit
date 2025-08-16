/*\
title: $:/plugins/oeyoews/neotw-ai/model/chatgpt.js
type: application/javascript
module-type: library

chatgpt以及兼容chatgpt
\*/

async function getAllModels(data) {
  const url = `${data.baseurl}/v1/models`;
  return fetch(url, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${data.apiKey}`,
    },
  }).then((res) => res.json());
}

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
    gpt4omini: 'gpt-4o-mini',
  };

  // getAllModels(data).then((data) => {
  //   console.log(data);
  // });

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${data.apiKey}`,
    },
    body: JSON.stringify({
      model: data.model || models.gpt4omini,
      stream: false,
      messages: [{ role: 'user', content: data.content }],
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
    return stream.choices?.[0]?.message.content;
  } catch (e) {
    console.error(e);
  }
}

module.exports = chatgpt;
