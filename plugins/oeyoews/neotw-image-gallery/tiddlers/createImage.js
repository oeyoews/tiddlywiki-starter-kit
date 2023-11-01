/*\
title: $:/plugins/oeyoews/neotw-image-gallery/createImage.js
type: application/javascript
module-type: library

\*/
/** create image node */
module.exports = function createImage(title, src) {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3, // 当图片50%进入可视区域时加载
  };

  const createElement = $tw.utils.domMaker;

  function callback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = src;
        image.onload = () => {
          img.alt = title;
          image.classList.remove(...dynamicClassNames.split(' '));
          img.classList.add('cursor-pointer');
        };
        observer.unobserve(image); // 加载后取消监测
      }
    });
  }

  const observer = new IntersectionObserver(callback, options);

  const dynamicClassNames = 'scale-105 blur-md bg-black/10 cursor-wait';
  const img = createElement('img', {
    class: `object-cover w-full h-full spotlight rounded-md group-hover:scale-105 transition-all duration-800 ease-in-out shadow-md aspect-video ${dynamicClassNames}`,
    attributes: {
      src,
      title,
      loading: 'lazy',
    },
  });

  observer.observe(img);

  img.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  return img;
};
