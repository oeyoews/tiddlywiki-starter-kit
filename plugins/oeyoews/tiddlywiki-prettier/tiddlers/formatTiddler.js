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

  try {
    const format = require('./format');
    const option = require('./option');

    const formatedText = await format(text);
    if (!formatedText) {
      // console.warn(formatedText);
      // notify here
      return;
    }
    $tw.wiki.setText(title, 'text', '', formatedText, {
      suppressTimestamp: true,
      ...option
    });
    $tw.notifier.display(
      '$:/plugins/oeyoews/tiddlywiki-prettier/notify/prettier'
    );
  } catch (e) {
    console.warn(e);
  }
};
