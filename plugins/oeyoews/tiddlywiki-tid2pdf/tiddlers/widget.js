/*\
title: tid2pdf/widget
type: application/javascript
module-type: widget

tid2pdf/widget

\*/
// TODO: 文字截断
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) {
    return;
  }

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class PDFWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const title = this.getVariable('currentTiddler');
      const param = this.getAttribute('param', `Download ${title}.pdf`);

      const buttonNode = $tw.utils.domMaker('button', {
        text: param,
        class:
          'bg-blue-200 hover:bg-blue-300 duration-200 transition rounded-sm py-1 px-2 transition duration-200 m-1',
        attributes: {},
      });

      buttonNode.addEventListener('click', async () => {
        confetti();
        const selector = `[data-tiddler-title="${title}"]`;
        const element = document.querySelector(selector);

        try {
          await this.exportPdf(element, `${title}.pdf`);
        } catch (error) {
          console.error(error);
        }
      });

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }

    async exportPdf(element, filename = '未命名') {
      const html2canvas = require('html2canvas.min.js');
      const jsPDF = require('jspdf.umd.min.js').jsPDF;

      if (!element) {
        return;
      }

      const originWidth = element.offsetWidth || 700;
      const container = document.createElement('div');
      container.style.cssText = `position:fixed;left: ${
        -2 * originWidth
      }px; top:0;padding:16px;width:${originWidth}px;box-sizing:content-box;`;
      document.body.appendChild(container);
      container.appendChild(element.cloneNode(true));

      // TODO: option
      const scale = 1.5;
      const width = originWidth + 32;

      const PDF_WIDTH = width * scale;
      const PDF_HEIGHT = width * 1.414 * scale;

      const render = function () {
        html2canvas(container, {
          useCORS: true,
          scale,
        }).then(function (canvas) {
          const contentWidth = canvas.width;
          const contentHeight = canvas.height;

          const pageHeight = (contentWidth / PDF_WIDTH) * PDF_HEIGHT;

          const imgWidth = PDF_WIDTH;
          const imgHeight = (PDF_WIDTH / contentWidth) * contentHeight;

          let leftHeight = contentHeight;
          let position = 0;

          const doc = new jsPDF('p', 'px', [PDF_WIDTH, PDF_HEIGHT]);

          if (leftHeight < pageHeight) {
            doc.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight);
          } else {
            while (leftHeight > 0) {
              doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
              leftHeight -= pageHeight;
              position -= PDF_HEIGHT;
              if (leftHeight > 0) {
                doc.addPage();
              }
            }
          }

          doc.save(filename);
          container.remove();
        });
      };
      render();
    }
  }

  exports.tid2pdf = PDFWidget;
})();
