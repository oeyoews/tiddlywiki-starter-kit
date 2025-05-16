/*\
title: $:/plugins/oeyoews/neotw-swiper/widget.js
type: application/javascript
module-type: widget

swiper widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class SwiperWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.swcontainer = null;
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const createElement = $tw.utils.domMaker;

    this.swcontainer = createElement('swiper-container', {
      attributes: {
        init: false,
        navigation: true,
        keyboard: true,
        // scrollbar: true,
        // direction: 'vertical',
        // 'slides-per-view': 'auto',
        // 'free-mode': true,
        // mousewheel: true,
      },
    });
    const slideNode = createElement('swiper-slide', {
      text: 'slide 123',
    });
    const slideNode2 = createElement('swiper-slide', {
      text: 'slide 213',
    });
    this.swcontainer.append(slideNode, slideNode2);

    const domNode = createElement('div', {
      children: [this.swcontainer],
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
    this.initSwiper();
  }

  initSwiper() {
    console.log(this.swcontainer);
    if (!this.swcontainer) return;

    const params = {
      injectStyles: [
        `
      .swiper-pagination-bullet {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: #000;
        opacity: 1;
        background: rgba(0, 0, 0, 0.2);
      }

      .swiper-pagination-bullet-active {
        color: #fff;
        background: #007aff;
      }
      `,
      ],
      pagination: {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    };

    Object.assign(this.swcontainer, params);

    this.swcontainer.initialize();
  }
}

/** @description neotw-swiper widget */
exports['neotw-swiper'] = SwiperWidget;
