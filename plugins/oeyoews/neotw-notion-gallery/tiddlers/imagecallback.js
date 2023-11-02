/*\
title: $:/plugins/oeyoews/neotw-notion-gallery/imagecallback.js
type: application/javascript
module-type: library

\*/
module.exports = (entries, observer) => {
  entries.forEach((entry) => {
    // 开始加载图片
    if (entry.isIntersecting) {
      const image = entry.target;
      image.src = image.getAttribute('data-src');
      // 加载动效
      image.onload = () => {
        const dynamicClassed = 'scale-105 blur-md bg-black/10 cursor-wait';
        image.classList.remove(...dynamicClassed.split(' '));
        image.classList.add('cursor-pointer');
      };
      // 加载图片后取消监测
      observer.unobserve(image) && console.log('en');
    }
  });
};
