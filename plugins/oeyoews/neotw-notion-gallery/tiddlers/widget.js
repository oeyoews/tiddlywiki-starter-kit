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
  const createCard = require('./createCard');
  const config = require('./config');

  class cardsWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.maxCards = config.maxCards;
      this.defaultFilter = config.defaultFilter;
      this.tiddlersLength = null;
      // this.tiddlersLength = $tw.wiki.filterTiddlers(
      //   '[!is[system]!has[draft.of]]',
      // ).length;
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;
      // check if tailwind is installed
      // need add window on browser
      if (!window.tailwind) {
        console.warn('tailwind not installed by @neotw-notion-gallery');
      }

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const wiki = $tw.wiki;

      // 需要this指向parentWidget, 使用箭头函数
      const navigate = (title) => {
        this.parentWidget.dispatchEvent({
          type: 'tm-navigate',
          param: title,
          navigateTo: title,
        });
        return false;
      };

      const { imageField, resoultion, imageSource } = config;

      this.tiddlersLength = this.getFilterLength();

      // TODO: 支持filter interface ui
      const filter = this.getAttribute('filter', this.defaultFilter);
      const recentTiddlers = wiki.filterTiddlers(filter);

      const loadData = (tiddlers) => {
        return tiddlers.map((tiddler) => {
          const { fields } = wiki.getTiddler(tiddler);
          let cover = fields[imageField];
          if (!cover || !cover.startsWith('http')) {
            cover = `${imageSource}/${resoultion}?fm=blurhash&${fields.title}`;
          }
          return {
            title: fields.title,
            cover,
          };
        });
      };

      const container = document.createElement('div');
      container.classList.add(
        'grid',
        'grid-cols-1',
        'sm:grid-cols-2',
        'md:grid-cols-3',
        'gap-8',
        'm-4',
      );

      if (recentTiddlers.length > this.maxCards) {
        console.warn(
          `${recentTiddlers.length} 张卡片即将渲染, 超过最大限制 ${this.maxCards} @neotw-notion-gallery`,
        );
      }

      const data = loadData(recentTiddlers);

      data.forEach(({ title, cover }, index) => {
        /* 防止用户渲染过多的卡片, */
        if (index >= this.maxCards) {
          return;
        }
        container.appendChild(createCard(title, cover, navigate));
      });

      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);
    }

    removedNumberFilter(filter) {
      return filter.replace(/limit\[\d+\]/g, '');
    }

    getFilterLength() {
      return $tw.wiki.filterTiddlers(
        this.removedNumberFilter(this.defaultFilter),
      ).length;
    }

    // 如果新增或者删除tiddler, 进行重新渲染(重命名不会)
    refresh() {
      let tiddlersLength = this.getFilterLength(); // 获取最新值
      if (tiddlersLength !== this.tiddlersLength) {
        this.refreshSelf(); // 重新渲染
        this.tiddlersLength = tiddlersLength; // update tiddlers length
      }
    }
  }

  exports.cards = cardsWidget;
})();
