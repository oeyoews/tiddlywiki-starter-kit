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
    if (window.location.protocol === 'http:') {
      document.title = `🐬 ${document.title}`;
      return;
    }

    fetch('https://api.github.com/repos/oeyoews/neotw/commits/main')
      /* 这行代码是一个箭头函数，用于将响应体转换成一个JSON格式的对象。在fetch函数中，响应体返回的是一个ReadableStream对象，需要通过调用json()方法来获取JSON格式的数据。
response.json()方法返回一个Promise对象，该Promise对象会在解析完成后，resolve一个JSON格式的对象。由于Promise对象的then方法可以接受一个回调函数作为参数，因此我们可以直接将response.json()作为回调函数传递给第一个then方法，让它自动处理响应数据并返回一个JSON格式的对象。
简单来说，这行代码是对响应数据进行了一次转换操作，可以使得后续的代码更加方便地使用响应数据，同时也提高了代码的可读性和易用性。 */
      .then(response => response.json())
      .then(data =>
        console.log(
          `%c 最后一次 commit 更新时间：${data.commit.author.date} https://github.com/oeyoews/neotw`,
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
