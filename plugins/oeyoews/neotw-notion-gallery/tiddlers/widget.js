/*\
title: $:/plugins/oeyoews/neotw-notion-gallery/widget.js
type: application/javascript
module-type: widget

neotw-notion-gallery widget

\*/
(function () {
  /*jslint node: true, browser: true */

  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class cardsWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      // TODO: 预设配置化
      this.maxCards = null;
      this.tiddlersLength = $tw.wiki.filterTiddlers(
        '[!is[system]!has[draft.of]]',
      ).length;
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const wiki = $tw.wiki;

      /** load config */
      const config = require('./config');

      const { defaultFilter, resoultion, maxCards, imageSource } = config;
      this.maxCards = maxCards;

      // TODO: 支持filter interface ui
      const filter = this.getAttribute('filter', defaultFilter);
      const recentTiddlers = wiki.filterTiddlers(filter);

      const data = recentTiddlers.map((tiddler) => {
        const { fields } = wiki.getTiddler(tiddler);
        // just support online images
        let cover = fields['page-cover'];
        if (!cover || !cover.startsWith('http')) {
          cover = `${imageSource}/${resoultion}?fm=blurhash&${fields.title}`;
        }
        return {
          title: fields.title,
          cover,
        };
      });

      const container = document.createElement('div');
      container.classList.add(
        'grid',
        'grid-cols-1',
        'sm:grid-cols-2',
        'md:grid-cols-3',
        'gap-8',
        'm-4',
      );

      // 必须使用箭头函数
      // TODO: 会触发notebook theme的closing
      const navigate = (title) => {
        this.parentWidget.dispatchEvent({
          type: 'tm-navigate',
          param: title,
          navigateTo: title,
        });
        return false;
      };

      function createCard(title, cover) {
        const item = document.createElement('div');
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
        const dynamicClassNames = ['scale-105', 'blur-lg', 'bg-black/10'];
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
      }

      if (recentTiddlers.length > this.maxCards) {
        console.warn(
          `${recentTiddlers.length} 张卡片即将渲染, 超过最大限制 ${this.maxCards} @neotw-notion-gallery`,
        );
      }

      data.forEach(({ title, cover }, index) => {
        /* 防止用户渲染过多的卡片, */
        if (index >= this.maxCards) {
          return;
        }
        container.appendChild(createCard(title, cover));
      });

      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);
    }

    // 如果新增或者删除tiddler, 进行重新渲染(重命名不会)
    // TODO: 粒度更细 -> 使用传入的filter的length
    refresh() {
      let tiddlersLength = $tw.wiki.filterTiddlers(
        '[!is[system]!has[draft.of]]',
      ).length;
      if (tiddlersLength !== this.tiddlersLength) {
        this.refreshSelf();
        this.tiddlersLength = tiddlersLength;
      }
    }
  }

  exports.cards = cardsWidget;
})();
