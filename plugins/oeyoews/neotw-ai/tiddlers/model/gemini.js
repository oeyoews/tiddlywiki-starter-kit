/*\
title: $:/plugins/oeyoews/neotw-ai/model/gemini.js
type: application/javascript
module-type: library

\*/

const {
  HarmBlockThreshold,
  GoogleGenerativeAI,
  HarmCategory,
} = require('./lib/gemini.min.js');

// const MODEL_NAME = 'gemini-1.0-pro-001';
const MODEL_NAME = 'gemini-1.5-flash';
// const MODEL_NAME = 'gemini-2.0-flash-exp';

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

module.exports = async (option) => {
  const { API_KEY, prompt, content, apiKey } = option;
  if (!prompt && !content) {
    return '没有任何输入';
  }
  // https://ai.google.dev/gemini-api/docs/quickstart?lang=node
  const genAI = new GoogleGenerativeAI(API_KEY || apiKey);

  const generationConfig = {
    //   stopSequences: ['red'],
    maxOutputTokens: 200,
    temperature: 0.5,
    topP: 0.1,
    topK: 16,
  };

  // https://github.com/google-gemini/generative-ai-js/issues/214
  // not work
  // const systemPrompt = `请阅读并总结日记，适当使用emoji，使用富有意境和哲理的文人语气，简体中文输出, 输出尽量简洁扼要， 不要换行，不要带有\n.`;

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig,
    // systemInstruction: {
    //   role: 'system',
    //   parts: [{ text: systemPrompt }],
    // },
    // https://github.com/google/generative-ai-docs/issues/212
    // https://ai.google.dev/docs/safety_setting_gemini
    safetySettings,
  });

  const chat = model.startChat({
    history: [],
    // generationConfig: {
    //   maxOutputTokens: 100,
    // },
  });

  // const result = await geminiChat(this.API_KEY).sendMessageStream(msg);
  // for await (const chunk of result.stream) {
  //   const chunkText = chunk.text();
  //   this.res += chunkText;

  /*   由于vue 更新队列是异步的， 所以不会有打字机效果
  for (const char of chunkText) {
    this.res += char;
    console.log(this.res);
  }
 */

  // }

  const result = await chat.sendMessage(prompt || content);
  const response = await result.response;
  const contents = response.text();
  return contents;
};
