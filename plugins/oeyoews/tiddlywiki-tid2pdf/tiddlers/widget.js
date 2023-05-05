/*\
title: tid2pdf/widget
type: application/javascript
module-type: widget

tid2pdf/widget

\*/
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

      const buttonNode = this.document.createElement('button');
      buttonNode.textContent = param;
      buttonNode.className =
        'bg-blue-200 hover:bg-blue-300 duration-200 transition rounded-sm py-1 px-2 transition duration-200 m-1';
      buttonNode.addEventListener('click', function () {
        var doc = new jspdf.jsPDF();

        const selector = `[data-tiddler-title="${title}"]`;

        var elements = document.querySelector(selector);

        html2canvas(elements, {
          width: 1000,
        }).then(function (canvas) {
          var imgData = canvas.toDataURL('image/png');

          var pdfWidth = doc.internal.pageSize.getWidth();
          var pdfHeight = (canvas.height * pdfWidth) / canvas.width;

          doc.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight);
          doc.save(`${title}.pdf`);
        });
      });
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

  exports.tid2pdf = PDFWidget;
})();
