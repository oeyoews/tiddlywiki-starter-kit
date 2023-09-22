/*\
title: $:/plugins/oeyoews/neotw-notion-gallery/createCard.js
type: application/javascript
module-type: library

\*/
/** create card */
module.exports = function createCard(title, cover, clickEvents) {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3, // 当图片50%进入可视区域时加载
  };

  function callback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = cover;
        image.onload = () => {
          image.classList.remove(...dynamicClassNames);
          item.appendChild(h3);
        };
        observer.unobserve(image); // 加载后取消监测
      }
    });
  }

  const observer = new IntersectionObserver(callback, options);

  const item = document.createElement('div');

  const navigate = clickEvents;

  item.classList.add(
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'group',
    'relative',
    'p-0',
  );
  const h3 = document.createElement('h3');
  h3.title = '点击查看';
  h3.classList.add(
    'delay-100',
    'text-lg',
    'cursor-pointer',
    'flex',
    'justify-center',
    'items-center',
    'truncate',
    'm-0',
    'inset-0',
    'absolute',
    'bg-black',
    'backdrop-blur',
    'bg-opacity-50',
    'text-white',
    'rounded-md',
    'scale-0',
    'ease-in-out',
    'transition-all',
    'group-hover:scale-105',
  );
  h3.textContent = title;
  h3.addEventListener('click', () => navigate(title));
  const img = document.createElement('img');
  // 动态懒加载图片的数量取决于视图的宽度和高度, 不是可见视图, 所以需要使用IntersectionObserver 来监测
  img.loading = 'lazy';
  const dynamicClassNames = [
    'scale-105',
    'blur-lg',
    'bg-black/10',
    'cursor-wait',
  ];
  img.classList.add(
    'aspect-video',
    'object-cover',
    'w-full',
    'h-full',
    'rounded-md',
    'group-hover:scale-105',
    'transition-all',
    'duration-800',
    'ease-in-out',
    'shadow-md',
    ...dynamicClassNames,
  );

  img.alt = title;
  // img.src = 'favicon.ico';
  item.appendChild(img);

  observer.observe(img);

  return item;
};
