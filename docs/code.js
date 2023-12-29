/*\
title: docs/code.js
type: application/javascript
description: tw-typed is a tw api declaration for typescript, it also works for javascript;下面是插件开发中经常使用到的一些方法
\*/

// wiki api
// 主要介绍了一些常用的 tiddlywiki api(JavaScript), 搭配 tw5-typed 效果更好, 代码可在使用tiddlywiki网页的控制台进行测试

// 首先这是 99% 你写插件会用到的 api. 大部分常用的方法都在 wiki 里面了
const wiki = $tw.wiki;
const title = 'tiddlywiki-api-tiddler-title';

// json type
const dataTiddler = {
  title: 'data-obj',
  text: 'random text'
};

// 赋值方法, 其实也可以直接 使用navigator.clipboard(), 不过 tiddlywiki 主要考虑使用es5为了兼容性更高, 所以建议直接使用内置的复制api
$tw.utils.copyToClipboard();

// get/add/set/delete/search

// 获取到某个 tiddler 的所有信息字段
wiki.getTiddler(title).fields;

// 加载某个 json 类型的tiddler, 作为对象
wiki.getTiddlerData(dataTiddler);

// 获取到某个tiddler 的正文, 其实就是tiddler 的text 字段
wiki.getTiddlerText();
// 等价于这种写法
wiki.getTiddler(title).fields.text;

// 编程式写法: 新增加一个tiddler
wiki.addTiddler({
  title: 'new tiddler',
  text: 'random text'
});
// 删除某个tiddler
wiki.deleteTiddler(title);

// 更新某个tiddler 的text
wiki.setText(title, 'text', null, 'random text', {
  suppressTimestamp: true // 不更新时间戳, 默认为false更新时间戳
});

// 根据 tiddlywiki 的筛选器, 批量获取 tiddler
wiki.filterTiddlers('[!is[system]]');

// 直接按照 tiddler 的 tag 过滤tiddler
wiki.getTiddlersWithTag('游戏');

// wip
wiki.getTiddlersAsJson(title);

const logger = new $tw.utils.Logger('alert title');

// 类似 window.alert
logger.alert('xxx');

// wip
wiki.setTiddlerData(title, data, fields, options);

// dom
$tw.utils.domMaker; // createElement

// https://github.com/Jermolene/TiddlyWiki5/blob/4b56cb42983d4134715eb7fe7b083fdcc04980f0/core/modules/startup/rootwidget.js#L58

// 显示一个通知
$tw.notifier.display(title); // send notification

// 显示 dialog
$tw.modal.display(title); // show a dialog

// wip
$tw.syncer.logger.alert('alert');

// widget
this.getVariable('currentTiddler'); // 获取当前条目名称;
this.getVariable('storyTiddler'); // 判断是否是处于 story river

// 如果目标元素没有 class 可以使用，仅支持单个 class
// $tw.utils.addClass(commode, 'font-bold')
// tiddler 的 field 的 class 支持设置样式就是来源于此，除了这一点，在写第三方插件的过程中感觉这种这种写法并没有比 className 有什么优势，更推荐使用 classList 方法
exports.addClass = function (el, className) {
  var c = (el.getAttribute('class') || '').split(' ');
  if (c.indexOf(className) === -1) {
    c.push(className);
    el.setAttribute('class', c.join(' '));
  }
};

// 移除 class
exports.removeClass = function (el, className) {
  var c = (el.getAttribute('class') || '').split(' '),
    p = c.indexOf(className);
  if (p !== -1) {
    c.splice(p, 1);
    el.setAttribute('class', c.join(' '));
  }
};

// 切换 class
exports.toggleClass = function (el, className, status) {
  if (status === undefined) {
    status = !exports.hasClass(el, className);
  }
  if (status) {
    exports.addClass(el, className);
  } else {
    exports.removeClass(el, className);
  }
};

// tw 会将你写的 widget 使用两个 function 进行包裹起来，可以看到这里最外层有 tw require console exports module 等等，这也就是为什么可以使用 require tw 的原因
(function (
  module,
  exports,
  console,
  setInterval,
  clearInterval,
  setTimeout,
  clearTimeout,
  Buffer,
  $tw,
  require
) {
  (function () {
    /*\
title: nprogress/startup.js
type: application/javascript
module-type: startup

nprogress module

\*/
    (function () {
      /*jslint node: true, browser: true */
      /*global $tw: false */
      'use strict';

      exports.name = 'nprogress-startup-hook';
      exports.platforms = ['browser'];
      exports.after = ['load-modules'];
      exports.synchronous = true;
      exports.startup = xxx;
    })();
  })();

  return exports;
});

//# sourceURL=nprogress/startup.js

// 渲染 tiddler, 支持wikitext
const icon = $tw.wiki.renderText(
  'text/html',
  'text/vnd.tiddlywiki',
  '<$iconify />',
  {
    parseAsInline: true // no extra tag
  }
);
