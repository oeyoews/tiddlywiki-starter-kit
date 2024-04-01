/*\
title: $:/plugins/oeyoews/vue-gemini/config.js
type: application/javascript
module-type: library
description: config

\*/

const {
  api: API_KEY,
  icon = '⬤',
  speed = 20,
  model = 'gemini',
  SPARK_API_KEY = '',
  SPARK_APP_ID = '',
  SPARK_API_SECRET = '',
} = $tw.wiki.getTiddler('$:/plugins/oeyoews/vue-gemini/config').fields;

module.exports = {
  icon,
  model,
  speed,
  API_KEY,
  SPARK_API_KEY,
  SPARK_APP_ID,
  SPARK_API_SECRET,
};
