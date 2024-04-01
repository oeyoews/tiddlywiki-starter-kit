/*\
title: $:/plugins/oeyoews/vue-gemini/model/index.js
type: application/javascript
module-type: library

\*/

const gemini = require('./gemini');
const spark = require('./spark');

const models = {
  gemini,
  spark,
};

module.exports = models;
