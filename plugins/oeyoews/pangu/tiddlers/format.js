/*\
title: $:/plugins/oeyoews/pangu/format.js
type: application/javascript
module-type: library

pangu widget
\*/

function format(title) {
  const pangu = require('./pangu.min.js');
  const text = $tw.wiki.getTiddlerText(title);
  const formatedText = pangu.spacing(text);
  if (text === formatedText) {
    return;
  }
  $tw.wiki.setText(title, 'text', null, formatedText, {
    suppressTimestamp: true,
  });
}

module.exports = format;
