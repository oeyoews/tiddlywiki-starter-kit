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
    image.src =
      'data:image/png;base64,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'; // 设置一张后备图片
    image.setAttribute('loading', 'lazy');
    // 开始加载图片
    if (entry.isIntersecting) {
      image.src = src;
      // 加载动效
      image.onload = () => {
        // 必须加载后？??
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
  threshold: 0.3 // 当图片 50% 进入可视区域时加载};
};

module.exports = new IntersectionObserver(imagecallback, imagecallbackoptions);
