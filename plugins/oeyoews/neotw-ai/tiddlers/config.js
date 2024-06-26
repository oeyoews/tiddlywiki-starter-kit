/*\
title: $:/plugins/oeyoews/neotw-ai/config.js
type: application/javascript
module-type: library
description: config

\*/

/**
 * Destructures the fields from the '$:/plugins/oeyoews/neotw-ai/config' tiddler.
 * @typedef {Object} Config
 * @property {string} api - The API key.
 * @property {string} [icon='⬤'] - The icon.
 * @property {number} [speed=20] - The speed.
 * @property {string} [model='gemini'] - The model.
 * @property {string} [SPARK_API_KEY=''] - The Spark API key.
 * @property {string} [SPARK_APP_ID=''] - The Spark app ID.
 * @property {string} [SPARK_API_SECRET=''] - The Spark API secret.
 * @property {string} [SILICONFLOW_API_KEY] - The SiliconFlow API key.
 */

/**
 * Destructures the fields from the '$:/plugins/oeyoews/neotw-ai/config' tiddler.
 * @type {Config} The destructured fields.
 */
const {
  api: API_KEY,
  icon = '⬤',
  speed = 20,
  model = 'gemini',
  SPARK_API_KEY = '',
  SPARK_APP_ID = '',
  SPARK_API_SECRET = '',
  SILICONFLOW_API_KEY,
} = $tw.wiki.getTiddler('$:/plugins/oeyoews/neotw-ai/config').fields;

module.exports = {
  icon,
  model,
  speed,
  API_KEY,
  SPARK_API_KEY,
  SPARK_APP_ID,
  SPARK_API_SECRET,
  SILICONFLOW_API_KEY,
};
