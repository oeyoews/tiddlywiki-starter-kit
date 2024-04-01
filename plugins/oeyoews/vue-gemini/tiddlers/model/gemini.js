/*\
title: $:/plugins/oeyoews/vue-gemini/model/gemini.js
type: application/javascript
module-type: library

\*/

const { GoogleGenerativeAI } = require('../lib/gemini.min.js');

module.exports = async (option) => {
  const { API_KEY, prompt } = option;
  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    //   stopSequences: ['red'],
    maxOutputTokens: 200,
    temperature: 0.5,
    topP: 0.1,
    topK: 16,
  };

  const model = genAI.getGenerativeModel({
    model: 'gemini-pro',
    generationConfig,
    // https://github.com/google/generative-ai-docs/issues/212
    // https://ai.google.dev/docs/safety_setting_gemini
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
    ],
  });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 100,
    },
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

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const contents = response.text();
  return contents;
};
