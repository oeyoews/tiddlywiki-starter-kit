const wiki = $tw.wiki;
const title = 'tiddlywiki-api-tiddler-title';

// json type
const dataTiddler = {
  text: 'random text',
};

// 获取到某个 tiddler 的所有信息字段
wiki.getTiddler(title).fields;

// 加载某个 json 类型的 tiddler, 作为对象
wiki.getTiddlerData(dataTiddler);

// 获取到某个 tiddler 的正文, 其实就是 tiddler 的 text 字段
wiki.getTiddlerText(title);
wiki.getTextReference('!!text', 'defaultText', tiddlerTitle);
wiki.getCreationFields(); // { "created": "2024-04-03T14:51:03.702Z", "creator": "oeyoews" }
// 等价于这种写法
wiki.getTiddler(title).fields.text;

// 编程式写法: 新增加一个 tiddler
wiki.addTiddler({
  title: 'new tiddler',
  text: 'random text',
});
// 删除某个 tiddler
wiki.deleteTiddler(title);

// 更新某个 tiddler 的 text
wiki.setText(title, 'text', null, 'random text', {
  suppressTimestamp: true, // 不更新时间戳, 默认为 false 更新时间戳
});

// 根据 tiddlywiki 的筛选器, 批量获取 tiddler
wiki.filterTiddlers('[!is[system]]');

// 直接按照 tiddler 的 tag 过滤 tiddler
wiki.getTiddlersWithTag('游戏');

// wip
wiki.getTiddlersAsJson(title);

const logger = new $tw.utils.Logger('alert title');

// 类似 window.alert
logger.alert('xxx');

// wip
wiki.setTiddlerData(title, data, fields, options);

// dom
wiki.utils.domMaker; // createElement

// https://github.com/Jermolene/TiddlyWiki5/blob/4b56cb42983d4134715eb7fe7b083fdcc04980f0/core/modules/startup/rootwidget.js#L58

// 显示一个通知
wiki.notifier.display(title); // send notification

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

// 不常用
// 移除 class
exports.removeClass = function (el, className) {
  var c = (el.getAttribute('class') || '').split(' '),
    p = c.indexOf(className);
  if (p !== -1) {
    c.splice(p, 1);
    el.setAttribute('class', c.join(' '));
  }
};

// 不常用
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
  require,
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

// 渲染 tiddler, 支持 wikitext
const icon = $tw.wiki.renderText(
  'text/html',
  'text/vnd.tiddlywiki',
  '<$iconify />',
  {
    parseAsInline: true, // no extra tag, note: sometime have a render bug, rencommend to false
  },
);

// 赋值方法, 其实也可以直接 使用 navigator.clipboard(), 不过 tiddlywiki 主要考虑使用 es5 为了兼容性更高, 所以建议直接使用内置的复制 api
$tw.utils.copyToClipboard();

// ???
$tw.rootWidget.invokeAction('');
$tw.rootWidget.invokeActionString();
$tw.renameTiddler('original', 'newtitle', options);

/*\
title: $:/plugins/oeyoews/image-observer/test.js
type: application/javascript
module-type: utils

@usage: $tw.utils.sayHi()

\*/

exports.sayHi = () => {
  console.log('Hello, Tiddlywiki');
};

$tw.wiki.getModificationFields();
