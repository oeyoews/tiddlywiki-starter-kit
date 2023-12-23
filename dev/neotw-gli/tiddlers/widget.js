/*\
title: $:/plugins/oeyoews/neotw-gli/widget.js
type: application/javascript
module-type: widget

neotw-gli widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  // adjuge this environment to the widget
  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  class GLIWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    /**
     * Asynchronously renders the HTML of the component in the provided parent element before the nextSibling.
     *
     * @param {HTMLElement} parent - The parent element to append the rendered HTML to.
     * @param {HTMLElement} nextSibling - The element before which the rendered HTML will be inserted.
     */

    /**
     * 异步地在提供的父元素中在 nextSibling 前渲染组件的 HTML。
     *
     * @param {HTMLElement} parent - 要将渲染的 HTML 附加到的父元素。
     * @param {HTMLElement} nextSibling - 要插入渲染的 HTML 的元素之前的元素。
     */
    async render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const url =
        'https://api.github.com/repos/oeyoews/neotw/commits?per_page=1';

      const gliNode = this.document.createElement('div');
      gliNode.textContent = 'Loading ...'; // 显示 loading

      try {
        const response = await fetch(url);
        const data = await response.json();

        // 提取最后一次提交的时间戳
        const timestamp = new Date(data[0].commit.author.date).getTime();
        // 格式化时间戳为字符串
        const timeStr = new Date(timestamp).toLocaleString();
        gliNode.textContent = `Last commit: ${timeStr}`; // 显示时间字符串
      } catch (error) {
        console.error(error);
        // gliNode.classList.add('font-bold', 'text-red-500');
        // const apiLimitMessage = 'API rate limit exceeded 😭';
        // gliNode.textContent = 'Error loading data; ' + apiLimitMessage; // 显示错误信息
        return;
      }

      parent.insertBefore(gliNode, nextSibling);
      this.domNodes.push(gliNode);
    }
  }

  exports.gli = GLIWidget;
})();
