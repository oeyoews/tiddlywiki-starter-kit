/*\
title: $:/plugins/oeyoews/neotw-ai/model/index.js
type: application/javascript
module-type: library

\*/

const gemini = require('./gemini');
const spark = require('./spark');
const siliconflow = require('./siliconflow');

const models = {
  gemini,
  spark,
  siliconflow,
};

module.exports = models;
