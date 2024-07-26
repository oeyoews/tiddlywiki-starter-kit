/*\
title: $:/plugins/oeyoews/neotw-menubar/toggleSidebar.js
type: application/javascript
module-type: library

\*/
module.exports = () => {
  if ($tw.wiki.getTiddlerText(`$:/state/notebook-sidebar`) == 'yes') {
    $tw.wiki.setText(`$:/state/notebook-sidebar`, 'text', null, 'no');
  } else {
    $tw.wiki.setText(`$:/state/notebook-sidebar`, 'text', null, 'yes');
  }
};
