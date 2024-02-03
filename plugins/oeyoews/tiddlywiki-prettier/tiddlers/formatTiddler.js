/*\
title: $:/plugins/oeyoews/tiddlywiki-prettier/formatTiddler.js
type: application/javascript
module-type: library

\*/

/**
 * Asynchronously formats the given text using Prettier.
 *
 * @param {string} text - The text to be formatted
 * @param {string} type - The type of parser to be used
 * @return {Promise<string>} The formatted text
 */
module.exports = async function (title, type = 'markdown') {
  const text = $tw.wiki.getTiddlerText(title);

  const format = require('./format');

  const formatedText = await format(text);
  $tw.wiki.setText(title, 'text', '', formatedText, {
    suppressTimestamp: true
  });
  $tw.notifier.display('prettier');
};
