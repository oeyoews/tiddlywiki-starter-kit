/*\
title: $:/plugins/oeyoews/neotw-fetch/addfile.js
type: application/javascript
module-type: library

仅支持简单的两层数据嵌套
\*/
exports.addfile = async (url, filename, type = 'text') => {
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res[type]();
    if (!data) return;
    if ($tw.wiki.tiddlerExists(filename)) {
      console.warn(`${filename} 已存在`);
      return;
    }
    $tw.wiki.addTiddler({
      title: filename,
      type: 'text/markdown',
      text: data
    });
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching data:', error);
  }
};

// cache
exports.getText = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    return await res.text();
  } catch (error) {
    console.error(error);
    return;
  }
};
