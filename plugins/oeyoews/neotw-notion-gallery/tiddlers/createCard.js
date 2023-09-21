/*\
title: $:/plugins/oeyoews/neotw-notion-gallery/createCard.js
type: application/javascript
module-type: library

\*/
/** create card */
module.exports = function createCard(title, cover, clickEvents) {
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
    ...dynamicClassNames,
  );

  img.alt = title;
  img.src = cover;
  item.appendChild(img);
  img.onload = () => {
    img.classList.remove(...dynamicClassNames);
    item.appendChild(h3);
  };

  return item;
};
