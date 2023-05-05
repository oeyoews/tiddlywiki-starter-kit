/*\
title: tid2pdf.js
type: application/javascript
module-type: library

\*/
function tid2pdf() {
  var doc = new jspdf.jsPDF();

  // 获取要转换成PDF的HTML元素
  const selector = `[data-tiddler-title="${title}"]`;

  var elements = document.querySelector(selector);

  html2canvas(elements, {
    width: 1000, // 将宽度设置为210mm (2100px)
  }).then(function (canvas) {
    var imgData = canvas.toDataURL('image/png');

    var pdfWidth = doc.internal.pageSize.getWidth();
    var pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    doc.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight);
    doc.save('example.pdf');
  });
}

module.exports = tid2pdf;
