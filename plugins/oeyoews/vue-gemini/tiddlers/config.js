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
} = $tw.wiki.getTiddler('$:/plugins/oeyoews/vue-gemini/config').fields;

module.exports = {
  API_KEY,
  icon,
  speed,
};
