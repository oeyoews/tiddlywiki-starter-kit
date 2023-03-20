/*\
title: $:/plugins/oeyoews/neotw-confetti/startup.js
type: application/javascript
module-type: startup

load confetti
\*/

('use strict');
module.exports = {
  ...module.exports,
  name: 'confetti-startup-hook',
  platforms: ['browser'],
  after: ['load-modules'],
  synchronous: !0,
  startup: () => {
    try {
      const confetti = require('$:/plugins/oeyoews/neotw-confetti/core/confetti.min.js');
      const runConfetti =
        require('$:/plugins/oeyoews/neotw-confetti/example/fireworks.js').runConfetti;
      runConfetti();
    } catch (r) {
      console.error(r);
    }
  },
};

/* 在 TiddlyWiki 中，global 和 startup 是两个不同的模块类型。

global 模块类型是用于定义全局变量和函数的 JavaScript 代码模块的。这些模块可以包含任意数量的全局变量和函数，并且可以在其他模块或插件中引用和使用。global 模块类型的代码可以使用 CommonJS 或 ES6 模块语法进行定义和导出，也可以使用其他的模块系统，例如 AMD 和 UMD。

startup 模块类型是用于在 TiddlyWiki 启动时执行的 JavaScript 代码的。这些模块可以用于初始化插件、注册事件处理程序、加载数据和配置等。startup 模块类型的代码必须使用 CommonJS 模块语法进行定义和导出，因为 TiddlyWiki 使用 Node.js 运行时来执行这些模块。

因此，global 和 startup 模块类型的主要区别在于它们的作用和使用方式。global 模块类型用于定义全局变量和函数，而 startup 模块类型用于在 TiddlyWiki 启动时执行一次性的初始化代码。 */
