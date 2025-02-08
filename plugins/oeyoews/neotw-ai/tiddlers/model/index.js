/*\
title: $:/plugins/oeyoews/neotw-ai/model/index.js
type: application/javascript
module-type: library

\*/

const gemini = require('./gemini');
const spark = require('./spark');
const chatgpt = require('./chatgpt');

const models = {
  gemini,
  spark,
  chatgpt,
  siliconflow: chatgpt,
  grok: chatgpt,
  default: chatgpt,
};

module.exports = models;
