/*\
title: $:/plugins/oeyoews/neotw-image-gallery/createImage.js
type: application/javascript
module-type: library

\*/
/** create image node */
module.exports = function createImage(title, src) {
  const createElement = $tw.utils.domMaker;

  const imageNode = createElement('img', {
    class: `object-cover w-full h-full spotlight rounded-md group-hover:scale-105 transition-all duration-800 ease-in-out shadow-md aspect-video`,
    attributes: {
      ['data-src']: src,
      title,
      loading: 'lazy',
    },
  });

  imageNode.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  return imageNode;
};
