/*\
title: $:/plugins/oeyoews/neotw-notion-gallery/twimageobserver.js
type: application/javascript
module-type: library

\*/
const imagecallback = (entries, observer) => {
  const dynamicClassed = 'scale-105 blur-md bg-black/10 cursor-wait';
  const dataSrc = 'data-src';

  entries.forEach((entry) => {
    const image = entry.target;
    const src = image.getAttribute('data-src');
    image.classList.add(...dynamicClassed.split(' '));
    image.src = ''; // 设置一张后备图片
    image.setAttribute('loading', 'lazy');
    // 开始加载图片
    if (entry.isIntersecting) {
      image.src = src;
      // 加载动效
      image.onload = () => {
        // 必须加载后???
        image.removeAttribute(dataSrc);
        image.classList.remove(...dynamicClassed.split(' '));
        image.classList.add('cursor-pointer');
      };
      // 加载图片后取消监测
      observer.unobserve(image);
    }
  });
};

const imagecallbackoptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3, // 当图片50%进入可视区域时加载};
};

module.exports = new IntersectionObserver(imagecallback, imagecallbackoptions);
