/*\
title: $:/plugins/oeyoews/neotw/startup/neotw.js
type: application/javascript
module-type: startup

neotw startup descption
\*/
(function () {
  exports.platforms = ['browser'];
  exports.after = ['story'];
  exports.synchronous = true;
  exports.startup = function () {
    if (!$tw.browser) return;
    if (window.location.protocol === 'http:') return;
    fetch('https://api.github.com/repos/oeyoews/neotw/commits/main')
      .then(response => response.json())
      .then(data =>
        console.log(
          `%c 最后一次 commit 更新时间：${data.commit.author.date}`,
          'background: linear-gradient(to right, #12c2e9, #c471ed); color: black;padding: 3px;',
        ),
      )
      .catch(error => console.error(error));
    fetch('https://raw.githubusercontent.com/oeyoews/neotw/main/package.json', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
      .then(response => response.json())
      .then(data =>
        console.log(
          `%c Neotw version is ${data.version}`,
          'background: linear-gradient(to right, #12c2e9, #c471ed); color: black;padding: 3px;',
        ),
      )
      .catch(error => console.error(error));
    console.log(
      '%c A modern style notebook based on tiddlywiki. @oeyoews  🎉',
      'background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59); color: black;border-radius: 3px;padding: 3px;',
    );
  };
})();
