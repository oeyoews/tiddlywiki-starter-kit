/*\
title: tid2pdf/widget-pdf
type: application/javascript
module-type: widget

tid2pdf/widget

\*/
// 如果高度过低, 显示效果可能不能达到最佳效果
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

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
      const html2canvas = require('html2canvas.min.js');
      const jsPDF = require('jspdf.umd.min.js').jsPDF;

      const classNames =
        'bg-blue-200 hover:bg-blue-300 duration-200 transition rounded-sm py-1 px-2 transition duration-200 m-1';
      const buttonNode = $tw.utils.domMaker('button', {
        text: param,
        class: classNames,
      });

      const selector = `[data-tiddler-title="${title}"]`;
      const elements = document.querySelector(selector);

      const scale = 1.5;
      buttonNode.addEventListener('click', function () {
        NProgress.start();
        html2canvas(elements, {
          allowTaint: true,
          useCORS: true,
          scale,
        }).then(function (canvas) {
          const aspectRatio = canvas.width / canvas.height;
          const PDF_WIDTH = 210;
          const PDF_HEIGHT = PDF_WIDTH / aspectRatio;

          const doc = new jsPDF({
            orientation: 'portrait', // landscape
            unit: 'mm',
            format: [PDF_WIDTH, PDF_HEIGHT],
          });

          const imgData = canvas.toDataURL('image/png');
          doc.addImage(imgData, 'PNG', 0, 0, PDF_WIDTH, PDF_HEIGHT);
          // doc.text(`This is a footer`, 10, PDF_HEIGHT - 10);
          doc.save(`${title}.pdf`);
          NProgress.done();
          confetti();
        });
      });

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }
  }

  exports.tid2pdf = PDFWidget;
})();
