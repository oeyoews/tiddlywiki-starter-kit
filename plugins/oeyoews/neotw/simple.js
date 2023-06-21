/*\
title: $:/plugins/oeyoews/simple-plugin.js
type: application/javascript
module-type: widget

Just a simple plugin
\*/

/**
 * 上面的注释会被tiddlywiki读取, 删除上面的注释真的会影响代码运行, 当然也可以使用meta文件代替, 暂时不谈, 如果复制整个文件的代码到tiddlywiki里面还需要添加 module-type字段为 widget 和type字段为 application/json
 *
 * 简单的widget 一般是对dom的操作, 如果代码很长, 也可以分成能够多个文件, 最后使用require进行加载
 *
 */

/**
 * 在Tiddlywiki里面, widget一般使用IFEE结构, tiddlywiki核心目前为了兼容性使用es5, 5.3.0以后准备引入es8 其实对于第三方插件来说, 也可以使用es6以后的语法, 不使用IFEE结构, 直接写代码, 比如下面的Class
 */
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class SimpleWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    // render 函数在被调用的时候只执行一次, 也可以看作main入口函数
    // Widget 类有很多函数, 如refresh, destory, 当然也可以自定义函数
    render(parent, nextSibling) {
      // 判断当前环境, 如果不是浏览器,则不渲染, 否则渲染, 建议加上
      if (!$tw.browser) return;

      // 固定模板, 不建议修改
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      // <$simple text="xxx" />
      const text = this.getAttribute('text', 'Button');

      /**
       * 传统的js创建节点, 下面两种方法都可以
       */
      const anotherButtonNode = document.createElement('button');
      anotherButtonNode.textContent = 'anotherButtonNode';

      const buttonNode = $tw.utils.domMaker('button', {
        text: text,
        // 节点class
        class: 'btn',
        // 节点属性
        attributes: {},
        // 子节点
        children: [anotherButtonNode],
        // ...
      });

      // 绑定点击事件
      buttonNode.addEventListener('click', this.handlerClick);

      // 插入 buttonNode 节点
      parent.insertBefore(buttonNode, nextSibling);
      // 便于tw 更新管理节点
      this.domNodes.push(buttonNode);
    }

    // 自定义函数
    handlerClick = () => {
      alert('button clicked');
    };
  }

  // widget(又称微件) 导出, tiddlywiki 会自动加载
  // 使用示例 <$simple text="xxx" />
  exports['simple'] = SimpleWidget;
})();