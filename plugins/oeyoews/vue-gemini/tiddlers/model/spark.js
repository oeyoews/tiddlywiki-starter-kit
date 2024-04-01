/*\
title: $:/plugins/oeyoews/vue-gemini/model/spark.js
type: application/javascript
module-type: library

\*/

const {
  ModelVersion,
  SparkClient,
  ChatMessage,
} = require('../lib/spark.min.js');

// const spark = require('../lib/spark.min.js');
// console.log(spark);

// @see: https://github.com/greywen/spark-node
module.exports = async (option) => {
  const { APPID, API_KEY: APIKey, APISecret, prompt } = option;

  const client = new SparkClient(APPID, APIKey, APISecret);

  const model = ModelVersion.V3_5;
  const messages = [ChatMessage.fromUser(prompt)];

  const generator = await client.chatAsStreamAsync(model, messages);

  let contents = '';
  for await (const message of generator) {
    console.log(message.text);
    contents += message.text;
  }
  return contents;
};
