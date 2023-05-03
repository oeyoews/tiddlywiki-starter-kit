/*\
title: $:/plugins/oeyoews/tiddlywiki-tailwindcss-plus/startup.js
type: application/javascript
module-type: startup
hide-body: yes

tailwindcss startup

\*/
(function() {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'tailwindcss-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    // 保存原始的console.warn()方法
    const originalWarn = console.warn;

    // 重写console.warn()方法
    console.warn = function(...args) {
      // 获取调用栈信息
      const stackTrace = new Error().stack;
      // 判断调用栈信息中是否包含"script.js"字符串
      if (stackTrace.includes('tailwindcss.min.js')) {
        // 自定义逻辑：拦截console.warn()信息，记录日志等
        // console.log('Intercepted warning from script.js:', ...args);
        console.warn('Tailwindcss is using cdn on production env');
      } else {
        // 调用原始的console.warn()方法输出警告信息
        originalWarn(...args);
      }
    };
    tailwind = require('tailwindcss.min.js');
    var tailwindConfig = require('tailwind.config.js');
    tailwind.config = tailwindConfig;
  };
})();
