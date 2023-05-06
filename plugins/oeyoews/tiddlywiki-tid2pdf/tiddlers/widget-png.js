/*\
title: tid2png/widget
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

  class PNGWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const title = this.getVariable('currentTiddler');
      const param = this.getAttribute('param', `Download ${title}.png`);

      const buttonNode = this.document.createElement('button');
      buttonNode.textContent = param;
      buttonNode.className =
        'bg-lime-200 hover:bg-lime-300 duration-200 transition rounded-sm py-1 px-2 transition duration-200 m-1';
      buttonNode.onclick = () => {
        const selector = `[data-tiddler-title="${title}"]`;
        var element = document.querySelector(selector);

        // 转换canvas为PNG格式的数据URL
        html2canvas(element).then(canvas => {
          const imgData = canvas.toDataURL('image/png');

          // 创建一个<a>元素，并指定其href属性为图像数据URL
          const linkNode = document.createElement('a');
          linkNode.href = imgData;

          // 指定文件名并将<a>元素添加到页面上
          linkNode.download = `${title}`;
          document.body.appendChild(linkNode);

          if (this.getAttribute('preview')) {
            // 如果传入了preview参数，则在新窗口中显示该图片
            const previewWindow = window.open('', '_blank');
            previewWindow.document.title = title;

            // 创建一个<img>元素，并将PNG格式的数据URL赋值给src属性
            const imgNode = previewWindow.document.createElement('img');
            imgNode.src = imgData;
            previewWindow.document.body.appendChild(imgNode);
          } else {
            // 否则直接下载该图片
            linkNode.click();
          }

          // 将<a>元素从页面上移除
          document.body.removeChild(linkNode);
        });
      };
      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }

    refresh() {
      var changedAttributes = this.computeAttributes();
      // changedAttributes.title;
      if (Object.keys(changedAttributes).length > 0) {
        this.refreshSelf();
        return true;
      } else {
        return false;
      }
    }
  }

  exports.tid2png = PNGWidget;
})();
