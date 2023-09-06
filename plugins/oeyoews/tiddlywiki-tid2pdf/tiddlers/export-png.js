/*\
title: $:/plugins/oeyoews/tiddlywiki-tid2png/export-png.js
type: application/javascript
module-type: library

export
\*/
const html2canvas = require("html2canvas.min.js");

module.exports = function exportPng(event) {
  NProgress.start();
  // 必须使用可选链运算符, 否则会报错, 或者类似下面那种写法, 声明一个空对象, 就不会有undefined 错误
  // const paramObject = event.paramObject || {};
  const title = event.paramObject?.title || event.tiddlerTitle;
  const selector = `[data-tiddler-title="${title}"]`;
  // html2canvas 不支持 cloneNode, 在widget中可以直接移除popup,因为widget会重新渲染, popup 会自动恢复? 但是这是一个listener, 不建议直接修改dom, 通过opacity实现,如果hidden,会引起页面抖动
  const element = document.querySelector(selector);
  const titlebar = element.querySelector(".tc-titlebar");
  titlebar && titlebar.classList.add("opacity-0");

  html2canvas(element, {
    useCORS: true,
  }).then((canvas) => {
    canvas.toBlob((blob) => {
      const sizeInBytes = blob.size;
      const sizeInMB = sizeInBytes / (1024 * 1024);
      const imgData = canvas.toDataURL("image/png"); // 转换canvas为PNG格式的数据URL

      const imgNode = new Image();
      imgNode.src = imgData;
      imgNode.crossOrigin = "";
      const cloneImgNode = imgNode.cloneNode(true);
      cloneImgNode.classList.add("max-w-3xl");

      const containerNode = document.createElement("div");
      containerNode.classList.add(
        "rounded-lg",
        // disable scroll
        "overflow-y-hidden",
        "max-h-screen",
        "max-w-3xl",
        "m-0"
      );
      containerNode.appendChild(cloneImgNode);

      const preview = true;

      const downloadPng = (imgData) => {
        const linkNode = $tw.utils.domMaker("a", {
          attributes: {
            href: imgData,
            download: `${title}.png`,
          },
        });
        linkNode.click();
      };
      // BUG: on phone, it's nothing even preview is normal on pck'iphone emulate env
      !preview && downloadPng(imgData);
      preview &&
        Swal.fire({
          html: containerNode,
          title: `Image size: ${sizeInMB.toFixed(2)} MB`,
          showCancelButton: true,
          confirmButtonText: "Download",
          cancelButtonText: "Cancel",
          customClass: "w-auto my-8",
        }).then((result) => {
          result.isConfirmed && downloadPng(imgData);
          NProgress.done();
        });
    }, "image/png");
  });
  titlebar && titlebar.classList.remove("opacity-0");
};
