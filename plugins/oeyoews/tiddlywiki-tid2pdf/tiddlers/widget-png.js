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

      const icon =
        '<svg width="22pt" height="22pt" class="tc-image-picture tc-image-button" viewBox="0 0 128 128"><path fill-rule="evenodd" d="M112 68.233v-48.23A4.001 4.001 0 00107.997 16H20.003A4.001 4.001 0 0016 20.003v38.31l9.241-14.593c2.8-4.422 9.023-5.008 12.6-1.186l18.247 20.613 13.687-6.407a8 8 0 018.903 1.492 264.97 264.97 0 002.92 2.739 249.44 249.44 0 006.798 6.066 166.5 166.5 0 002.106 1.778c2.108 1.747 3.967 3.188 5.482 4.237.748.518 1.383.92 2.044 1.33.444.117 1.046.144 1.809.05 1.873-.233 4.238-1.144 6.723-2.547a36.016 36.016 0 003.205-2.044c.558-.4.93-.686 1.07-.802.376-.31.765-.577 1.165-.806zM0 8.007A8.01 8.01 0 018.007 0h111.986A8.01 8.01 0 01128 8.007v111.986a8.01 8.01 0 01-8.007 8.007H8.007A8.01 8.01 0 010 119.993V8.007zM95 42a8 8 0 100-16 8 8 0 000 16zM32 76c15.859 4.83 20.035 7.244 20.035 12S32 95.471 32 102.347c0 6.876 1.285 4.99 1.285 9.653H68s-13.685-6.625-13.685-10.8c0-7.665 10.615-8.34 10.615-13.2 0-7.357-14.078-8.833-32.93-12z"/></svg>';
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
      NProgress.start();
    }
  }

  exports.tid2png = PNGWidget;
})();
