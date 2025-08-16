/*\
title: $:/plugins/oeyoews/neotw-ai/model/spark.js
type: application/javascript
module-type: library

是否收费：是
是否兼容openapi: 否
@see: https://console.xfyun.cn
@see: https://github.com/greywen/spark-node
\*/

const {
  ModelVersion,
  SparkClient,
  ChatMessage,
} = require('../lib/spark.min.js');

module.exports = async (option) => {
  const {
    APP_ID: APPID,
    API_KEY: APIKey,
    API_SECRET: APISecret,
    prompt,
  } = option;

  if (!prompt) {
    return '没有任何输入';
  }

  const client = new SparkClient(APPID, APIKey, APISecret);

  const model = ModelVersion.V3_5;
  const messages = [ChatMessage.fromUser(prompt)];

  const generator = await client.chatAsStreamAsync(model, messages);

  let contents = '';
  for await (const message of generator) {
    contents += message.text;
  }
  return contents;
};
