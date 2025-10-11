/*\
title: $:/plugins/oeyoews/autocorrect-wrapper/action.js
type: application/javascript
module-type: library

autocorrect-wrapper library

\*/

function action(tiddler) {
  if (!tiddler) {
    console.info('please input a tiddler');
    return;
  }
  if (!$tw.wiki.tiddlerExists(tiddler)) {
    console.info(tiddler, 'is not exist');
    return;
  }
  console.info('title is ', tiddler);
  if (!window._formatFor) {
    console.info('autocorrect is not exist, please check you environment');
    return;
  }
  const formatFor = window._formatFor;
  const originalText = $tw.wiki.getTiddlerText(tiddler);
  const EXT = 'md';
  const formatedText = formatFor(originalText, EXT);
  // console.log(formatedText);
  if (formatedText.out === originalText) {
    console.info('has already updated.');
    return;
  }
  if (formatedText?.out) {
    $tw.wiki.setText(tiddler, 'text', null, formatedText.out);
    console.log(tiddler, 'formated successfully');
  } else {
    console.info('error', formatedText.error);
  }
}

module.exports = action;
