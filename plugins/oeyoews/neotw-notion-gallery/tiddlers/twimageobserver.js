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
    image.classList.add(...dynamicClassed.split(' '));
    image.setAttribute('loading', 'lazy');
    // 开始加载图片
    if (entry.isIntersecting) {
      image.src = image.getAttribute(dataSrc);
      image.removeAttribute(dataSrc);
      // 加载动效
      image.onload = () => {
        image.classList.remove(...dynamicClassed.split(' '));
        image.classList.add('cursor-pointer');
      };
      // 加载图片后取消监测
      observer.unobserve(image) && console.log('en');
    }
  });
};

const imagecallbackoptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3, // 当图片50%进入可视区域时加载};
};

module.exports = new IntersectionObserver(imagecallback, imagecallbackoptions);
