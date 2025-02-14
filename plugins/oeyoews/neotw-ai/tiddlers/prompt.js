/*\
title: $:/plugins/oeyoews/neotw-ai/prompt.js
type: application/javascript
module-type: library
description: prompt

\*/

function getPrompt(content) {
  return `请阅读并总结日记，适当使用emoji，使用富有意境和哲理的文人语气，简体中文输出, 输出尽量简洁扼要， 不要换行，不要带有\n, 以下是今日日记。\n ${content}`;
}

function getRenameTitle(title) {
  return `你现在是一个标题命名优化专家，现在的标题是: ${title}; 优化这个标题，去除冗余信息, 不要输出双引号， 仅仅输出优化后的标题即可`;
}

module.exports = {
  getPrompt,
  getRenameTitle,
};
