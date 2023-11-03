/*\
title: $:/plugins/oeyoews/neotw-fetch/addfile.js
type: application/javascript
module-type: library

仅支持简单的两层数据嵌套
\*/
module.exports = (url, filename, type = 'text') => {
  if (!url) alert('url 为空');
  console.log(filename, url);
  fetch(url)
    .then((res) => {
      if (!res.ok) return;
      return res[type]();
    })
    .then((data) => {
      if (!data) return;
      if ($tw.wiki.tiddlerExists(filename)) {
        console.warn(`${filename} 已存在`);
        return;
      }
      $tw.wiki.addTiddler({
        title: filename,
        type: 'text/markdown',
        text: data,
      });
    });
};
