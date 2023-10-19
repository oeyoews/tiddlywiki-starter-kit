/*\
title: $:/plugins/oeyoews/neotw-notion-gallery/createCard.js
type: application/javascript
module-type: library

\*/
/** create card */
module.exports = function createCard(
  title,
  cover,
  clickEvents,
  icon,
  standard = true,
) {
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
        image.src = cover;
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
  const itemClassList =
    'flex flex-col items-center justify-center p-0 group relative';
  const galleryTitleClassList =
    'delay-100 text-[22px] cursor-pointer flex justify-center items-center truncate m-0 absolute inset-0 backdrop-blur-lg text-black rounded-md ease-in-out transition-all scale-0 group-hover:scale-105';

  const iconify = createElement('iconify-icon', {
    class: 'mx-1',
    attributes: {
      icon: icon || 'simple-icons:tiddlywiki',
    },
  });

  const galleryTitle = createElement('h3', {
    class: galleryTitleClassList,
    text: title,
    children: [iconify],
    attributes: {
      title: '点击查看',
    },
  });

  const contentNode = createElement('div', {
    children: [galleryTitle],
  });

  galleryTitle.addEventListener('click', () => clickEvents(title));

  const img = createElement('img', {
    class: `object-cover w-full h-full rounded-md group-hover:scale-105 transition-all duration-800 ease-in-out shadow-md aspect-video ${dynamicClassNames}`,
    attributes: {
      loading: 'lazy',
    },
  });

  standard === 'false' && img.classList.remove('aspect-video');

  const item = createElement('div', {
    class: itemClassList,
    children: [img, contentNode],
  });

  observer.observe(img);

  item.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  return item;
};
