/*\
title: $:/plugins/oeyoews/neotw-notion-gallery/twimageobserver.js
type: application/javascript
module-type: global

\*/

class LazyImageLoader {
  constructor() {
    this.dynamicClassed = 'scale-105 blur-md bg-black/10 cursor-wait';
    this.dataSrc = 'data-src';

    this.imageCallback = this.imageCallback.bind(this);
    this.imageCallbackOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    this.observer = new IntersectionObserver(
      this.imageCallback,
      this.imageCallbackOptions
    );
  }

  imageCallback(entries, observer) {
    entries.forEach((entry) => {
      const image = entry.target;
      const src = image.getAttribute(this.dataSrc);
      image.classList.add(...this.dynamicClassed.split(' '));
      image.src = 'data:image/png;base64,iVBORw0...';

      if (entry.isIntersecting) {
        image.src = src;
        image.onload = () => {
          image.removeAttribute(this.dataSrc);
          image.classList.remove(...this.dynamicClassed.split(' '));
          image.classList.add('cursor-pointer');
        };
        observer.unobserve(image);
      }
    });
  }
}

exports.ImageObserver = LazyImageLoader;
