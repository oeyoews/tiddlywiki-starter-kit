/*\
title: tid2png/widget-plus
type: application/javascript
module-type: widget

tid2png/widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const domtoimage = require('dom-to-image.min.js');

  class PNGWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    computeAttributes() {
      super.computeAttributes();
      this.title = this.getVariable('currentTiddler', 'default title');
      this.param = this.getAttribute('param', `Download ${this.title}.png`);
      this.preview = this.getAttribute('preview', false);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const buttonNode = this.document.createElement('button');
      buttonNode.textContent = this.param;
      buttonNode.className =
        'bg-lime-200 hover:bg-lime-300 duration-200 transition rounded-sm py-1 px-2 transition duration-200 m-1';

      const downloadPng = imgData => {
        // 创建一个<a>元素，并指定其href属性为图像数据URL
        const linkNode = document.createElement('a');
        linkNode.href = imgData;

        // 指定文件名并将<a>元素添加到页面上
        linkNode.download = `${this.title}`;
        document.body.appendChild(linkNode);

        // 使用dom-to-image库生成PNG格式的图像，并将DataURL传递给回调函数
        domtoimage
          .toPng(element)
          .then(function (dataUrl) {
            // 将图像数据URL赋值给<img>元素的src属性
            imgNode.src = dataUrl;

            // 触发下载图像事件
            linkNode.click();

            // 将<a>元素从页面上移除
            document.body.removeChild(linkNode);
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
      };

      buttonNode.onclick = () => {
        const selector = `[data-tiddler-title="${this.title}"]`;
        var element = document.querySelector(selector);

        // 转换canvas为PNG格式的数据URL
        domtoimage.toPng(element).then(dataUrl => {
          // 创建一个<img>元素，并将PNG格式的数据URL赋值给src属性
          const imgNode = document.createElement('img');
          imgNode.src = dataUrl;

          downloadPng(dataUrl);
        });
      };
      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }
  }

  exports.tid2png2 = PNGWidget;
})();
