/*\
title: $:/plugins/oeyoews/neotw-notion-gallery/createCard.js
type: application/javascript
module-type: library

\*/

// @see-also: https://www.bilibili.com/video/BV1FU4y157Li/?spm_id_from=333.788&vd_source=d6afd7eedd9f9c940321c63f0a1539e3
/** create card */
module.exports = function createCard(
  title,
  caption,
  cover,
  clickEvents,
  icon,
  standard = true
) {
  const createElement = $tw.utils.domMaker;

  const itemClassList =
    'flex flex-col items-center justify-center p-0 group relative';
  const galleryTitleClassList =
    'delay-100 text-[22px] cursor-pointer flex justify-center items-center truncate m-0 absolute inset-0 backdrop-blur-lg text-black rounded-md ease-in-out transition-all scale-0 group-hover:scale-105';

  const iconify = createElement('iconify-icon', {
    class: 'mx-1',
    attributes: {
      icon: icon || 'simple-icons:tiddlywiki'
    }
  });

  const galleryTitle = createElement('h3', {
    class: galleryTitleClassList,
    text: caption || title,
    children: [iconify],
    attributes: {
      title: '点击查看'
    }
  });

  const contentNode = createElement('div', {
    children: [galleryTitle]
  });

  galleryTitle.addEventListener('click', () => clickEvents(title));

  const imageNode = createElement('img', {
    class: `object-cover w-full h-full rounded-md group-hover:scale-105 transition-all duration-800 ease-in-out shadow-md aspect-video`,
    attributes: {
      ['data-src']: cover,
      alt: caption || title // '如果不设置，会有黑边'
    }
  });

  standard === 'false' && imageNode.classList.remove('aspect-video');

  const item = createElement('div', {
    class: itemClassList,
    children: [imageNode, contentNode]
  });

  // 禁止右键功能
  item.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  return { imageNode, item };
};
