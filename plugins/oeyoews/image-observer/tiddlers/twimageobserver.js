/*\
title: $:/plugins/oeyoews/image-observer/twimageobserver.js
type: application/javascript
module-type: global

\*/

class LazyImageLoader {
  constructor() {
    this.dynamicClassed =
      'scale-105 blur-none md:blur-md bg-black/10 cursor-wait'; // 移动端上 blur 效果不能及时移除
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
      const src = image.dataset.src;
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
