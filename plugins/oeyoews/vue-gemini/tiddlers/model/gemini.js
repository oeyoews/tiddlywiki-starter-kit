/*\
title: $:/plugins/oeyoews/vue-gemini/model/gemini.js
type: application/javascript
module-type: library

\*/

const { GoogleGenerativeAI } = require('../lib/gemini.min.js');

module.exports = (API_KEY) => {
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

  return chat;
};
