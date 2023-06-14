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

      const classNames = this.getAttribute('class', '').split(' ');

      const divNode = $tw.utils.domMaker('div', {
        text: '',
        class: 'bg-black text-white rounded inline py-2 px-4 text-xl',
      });
      classNames.forEach(className => {
        if (className) {
          divNode.classList.add(className);
        }
      });

      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);
      this.update();
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
      } else {
        // 获取当前时间并更新 widget 的内容
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        // this.dom节点的内容更新为当前时间字符串;
        this.domNodes[0].textContent = timeString;
        // console.log('updated widget');
      }
    }
  }

  exports['otime'] = TimeWidget;
})();
