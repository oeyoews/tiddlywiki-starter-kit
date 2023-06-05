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

      // support focused tiddler
      const title = this.getVariable('currentTiddler');
      const param = this.getAttribute('param', `Download ${title}.pdf`);

      const buttonNode = $tw.utils.domMaker('button', {
        text: param,
        class:
          'bg-blue-200 hover:bg-blue-300 duration-200 transition rounded-sm py-1 px-2 transition duration-200 m-1',
        attributes: {},
      });

      const selector = `[data-tiddler-title="${title}"]`;
      const element = document.querySelector(selector);

      buttonNode.addEventListener('click', async () => {
        await this.exportPdf(element, `${title}.pdf`);
      });

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }

    async exportPdf(element, filename = 'untitled.pdf') {
      confetti();
      NProgress.start();
      const html2canvas = require('html2canvas.min.js');
      const { jsPDF } = require('jspdf.umd.min.js');

      const container = document.createElement('div');
      container.appendChild(element.cloneNode(true));
      document.body.appendChild(container);

      const scale = 1.5;
      const render = function () {
        html2canvas(container, {
          allowTaint: true,
          useCORS: true,
          scale,
        }).then(function (canvas) {
          const aspectRatio = canvas.width / canvas.height;
          const PDF_WIDTH = 210; // A4 size in mm
          const PDF_HEIGHT = PDF_WIDTH / aspectRatio;
          const doc = new jsPDF({
            orientation: 'portrait', // landscape
            unit: 'px',
            format: [PDF_WIDTH, PDF_HEIGHT],
          });
          doc.addImage(canvas, 'PNG', 0, 0, PDF_WIDTH, PDF_HEIGHT);
          doc.save(filename);
          container.remove();
          NProgress.done();
        });
      };
      render();
    }
  }

  exports.tid2pdf = PDFWidget;
})();
