/*\
title: $:/plugins/oeyoews/tiddlywiki-prettier/format.js
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
module.exports = async function (text, type = 'markdown') {
  if (!window.prettier) {
    return;
  }
  if (!window.prettierPlugins) {
    return;
  }

  this.prettier = window.prettier;
  this.plugins = window.prettierPlugins;

  if (!this.plugins.markdown) {
    console.warn('Miss prettier markdown plugin');
    return;
  }

  const formatedText = await this.prettier.format(text, {
    parser: type,
    plugins: [this.plugins[type]]
  });
  return formatedText;
};
