/*\
title: $:/plugins/oeyoews/tiddlywiki-fancybox/addDataFancy.js
type: application/javascript
module-type: library

addDataFancy
\*/
module.exports = function addDataFancy() {
  const imgs = document.querySelectorAll('img');
  console.log(imgs);

  Swal.fire({
    title: imgs.length ? `启动 Fancybox` : `当前页面没有图片`,
    icon: imgs.length ? 'success' : 'info',
    toast: true,
    showCancelButton: false,
    showConfirmButton: false,
    timer: 1500,
    position: 'top-end',
  });

  if (!imgs.length) {
    return;
  }

  imgs.forEach((img, index) => {
    img.addEventListener('click', () => {
      img.setAttribute('data-fancybox', index.toString());
    });
  });
};
