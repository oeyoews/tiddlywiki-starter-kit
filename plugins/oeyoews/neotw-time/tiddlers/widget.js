/*\
title: $:/plugins/oeyoews/neotw-time/widget.js
type: application/javascript
module-type: widget

neotw-time widget

\*/
// TODO 实现翻转效果
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class TimeWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);

      // 设置默认更新间隔为 1 秒
      this.interval = this.getAttribute('interval', 1000);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const divNode = $tw.utils.domMaker('div', {
        text: '',
        class: '',
        attributes: {
          id: 'otime',
        },
      });
      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);
      this.startTimer();
    }

    startTimer() {
      // 使用箭头函数来绑定正确的 this 引用
      this.timer = setInterval(() => {
        // 更新 widget 的内容
        this.update();
      }, this.interval);
    }

    update() {
      if (!this.domNodes || !this.domNodes[0]) {
        clearInterval(this.timer);
        return;
      }
      // 获取当前时间并更新 widget 的内容
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      // this.dom节点的内容更新为当前时间字符串;
      this.domNodes[0].textContent = timeString;
    }

    destructor() {
      // 清除定时器，避免内存泄漏
      clearInterval(this.timer);
    }
  }

  exports['otime'] = TimeWidget;
})();
