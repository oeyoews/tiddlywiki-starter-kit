/*\
title: tid2png/widget
type: application/javascript
module-type: widget

tid2png/widget

\*/
// TODO: count img size
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class PNGWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    computeAttributes() {
      super.computeAttributes();
      this.title = this.getVariable('currentTiddler', 'default title');
      if (this.title.length > 12) {
        const firstHalf = this.title.substring(0, 6);
        const secondHalf = this.title.substring(this.title.length - 6);
        this.title = `${firstHalf}...${secondHalf}`;
      }
      this.param = this.getAttribute('param', `Download ${this.title}.png`);
      this.preview = this.getAttribute('preview', true);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const widget = $tw.wiki.makeTranscludeWidget('$:/core/images/picture', {
        document: $tw.fakeDocument,
        parseAsInline: true,
      });
      const container = $tw.fakeDocument.createElement('div');
      widget.render(container, null);
      const icon = container.firstChild.innerHTML;
      const html2canvas = require('html2canvas.min.js');
      const buttonNode = $tw.utils.domMaker('button', {
        innerHTML: `${icon} ${this.param}`,
        class:
          'bg-lime-200 hover:bg-lime-300 duration-200 transition rounded-sm py-1 px-2 transition duration-200 m-1',
        attributes: {},
        children: [],
        eventListeners: [
          {
            name: 'click',
            handlerObject: this,
            handlerMethod: 'handleClick',
          },
        ],
      });

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);

      const downloadPng = imgData => {
        NProgress.start();
        const linkNode = $tw.utils.domMaker('a', {
          attributes: {
            href: imgData,
            download: this.title,
          },
        });
        linkNode.click();
        NProgress.done();
      };

      buttonNode.onclick = () => {
        const selector = `[data-tiddler-title="${this.title}"]`;
        var element = document.querySelector(selector);

        // 转换canvas为PNG格式的数据URL
        html2canvas(element, {
          allowTaint: true,
          useCORS: true,
          letterRendering: 1,
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');

          // TODO: support data-fancybox arrtibute
          // https://www.zhangxinxu.com/wordpress/2018/02/crossorigin-canvas-getimagedata-cors/
          const imgNode = new Image();
          imgNode.src = imgData;
          imgNode.crossOrigin = 'anonymous'; // 允许跨域访问
          imgNode.style.width = '712px';

          const containerNode = document.createElement('div');
          containerNode.classList.add(
            'border',
            'border-2',
            'p-1',
            'rounded',
            'overflow-y-scroll',
            'h-screen',
            'shadow-md',
          );
          containerNode.appendChild(imgNode);

          const previewImg = () => {
            //  手机上异常, 对于个别tiddler
            Swal.fire({
              icon: 'success',
              title: `${this.title}`,
              html: containerNode,
              showCancelButton: true,
              confirmButtonText: 'Download',
              cancelButtonText: 'Cancel',
              customClass: 'w-auto',
            }).then(result => {
              if (result.isConfirmed) {
                downloadPng(imgData);
              }
            });
          };

          this.preview ? previewImg() : downloadPng(imgData);
        });
      };
    }

    handleClick() {
      confetti();
    }
  }

  exports.tid2png = PNGWidget;
})();
