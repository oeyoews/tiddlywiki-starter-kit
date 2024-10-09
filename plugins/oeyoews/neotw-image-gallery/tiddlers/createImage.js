/*\
title: $:/plugins/oeyoews/neotw-image-gallery/createImage.js
type: application/javascript
module-type: library

\*/
/**
 * @function createImage
 * @description Creates an image node.
 * @param {string} title - The title of the image.
 * @param {string} src - The source URL of the image.
 * @returns {HTMLImageElement} The created image node.
 */
module.exports = function createImage(title, src, standard = true) {
  const createElement = $tw.utils.domMaker;

  const imageNode = createElement('img', {
    class: `object-cover w-full h-full spotlight rounded-md group-hover:scale-105 transition-all duration-800 ease-in-out shadow-md aspect-video`,
    attributes: {
      ['data-src']: src,
      title,
      loading: 'lazy'
    }
  });

  standard === 'false' && imageNode.classList.remove('aspect-video');
  imageNode.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  return imageNode;
};
