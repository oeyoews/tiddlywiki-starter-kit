/*\
title: $:/plugins/oeyoews/neotw-ai/model/index.js
type: application/javascript
module-type: library

\*/

const gemini = require('./gemini');
const spark = require('./spark');
const chatgpt = require('./chatgpt');
// const ollama = require('./ollama');

const models = {
  gemini,
  chatgpt,
  spark,
  siliconflow: chatgpt,
  grok: chatgpt,
  default: chatgpt,
  groq: chatgpt,
};

module.exports = models;
