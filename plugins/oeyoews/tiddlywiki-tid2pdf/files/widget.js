/*\
title: tid2pdf/widget
type: application/javascript
module-type: widget

tid2pdf/widget

\*/
// TODO: long tid not work well
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

      const buttonNode = $tw.utils.domMaker('button', {
        text: param,
        class:
          'bg-blue-200 hover:bg-blue-300 duration-200 transition rounded-sm py-1 px-2 transition duration-200 m-1',
        attributes: {},
      });

      buttonNode.addEventListener('click', function () {
        var doc = new jsPDF();

        const selector = `[data-tiddler-title="${title}"]`;

        var elements = document.querySelector(selector);

        html2canvas(elements, {
          width: 1200,
          height: 3200,
        }).then(function (canvas) {
          var imgData = canvas.toDataURL('image/png');
          var ratio = canvas.width / canvas.height; // 计算 HTML 元素的宽高比例
          var pdfWidth = doc.internal.pageSize.getWidth();
          var pdfHeight = pdfWidth / ratio; // 根据页面大小调整 PDF 的高度
          doc.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight);
          doc.save(`${title}-${pdfWidth}-${pdfHeight}.pdf`);
        });
      });

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }
  }

  exports.tid2pdf = PDFWidget;
})();
