/*\
title: $:/plugins/oeyoews/tiddlywiki-tid2png/export-png.js
type: application/javascript
module-type: library

window.resvers tiddlerscreenshot
add download button
remove then

export
\*/
const html2canvas = require("html2canvas.min.js");

module.exports = function exportPng(event) {
  NProgress.start();
  // 必须使用可选链运算符, 否则会报错, 或者类似下面那种写法, 声明一个空对象, 就不会有undefined 错误
  // const paramObject = event.paramObject || {};
  const title = event.paramObject?.title || event.tiddlerTitle;
  const selector = `[data-tiddler-title="${title}"]`;
  // html2canvas 不支持 cloneNode, 在widget中可以直接移除popup,因为widget会重新渲染, popup 会自动恢复? 但是这是一个listener, 不建议直接修改dom; 下面使用了hidden隐藏titlebar元素, 实际页面不会被用户感知到有所抖动
  const element = document.querySelector(selector);
  const titlebar = element.querySelector(".tc-titlebar");
  titlebar.classList.add("hidden");

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
      imgNode.classList.add("max-w-3xl");

      const containerNode = document.createElement("div");

      containerNode.classList.add(
        "rounded-lg",
        "overflow-y-hidden",
        "max-h-screen",
        "max-w-3xl",
        "m-0"
      );
      containerNode.appendChild(imgNode);

      const downloadPng = (href) => {
        const linkNode = $tw.utils.domMaker("a", {
          attributes: {
            href,
            download: `${title}.png`,
          },
        });

        linkNode.click();
      };

      Swal.fire({
        html: containerNode,
        title: `Image size: ${sizeInMB.toFixed(2)} MB`,
        showCancelButton: true,
        confirmButtonText: "Download ",
        cancelButtonText: "Cancel",
        customClass: "w-auto my-8",
      }).then((result) => {
        result.isConfirmed && downloadPng(imgData);
        NProgress.done();
      });
    }, "image/png");
  });

  // remove hidden
  titlebar.classList.remove("hidden");
};
