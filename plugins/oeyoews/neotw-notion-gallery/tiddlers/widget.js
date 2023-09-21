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

  class cardsWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      // TODO: 预设配置化
      this.maxCards = null;
      this.defaultFilter = null;
      this.tiddlersLength = null;
      // this.tiddlersLength = $tw.wiki.filterTiddlers(
      //   '[!is[system]!has[draft.of]]',
      // ).length;
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;
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

      /** load config */
      const config = require('./config');

      const { defaultFilter, resoultion, maxCards, imageSource } = config;
      this.defaultFilter = defaultFilter;

      this.tiddlersLength = this.getFilterLength();
      this.maxCards = maxCards;

      // TODO: 支持filter interface ui
      const filter = this.getAttribute('filter', this.defaultFilter);
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
      // 获取最新值
      let tiddlersLength = this.getFilterLength();
      if (tiddlersLength !== this.tiddlersLength) {
        // 重新渲染
        this.refreshSelf();
        // update tiddlers length
        this.tiddlersLength = tiddlersLength;
      }
    }
  }

  exports.cards = cardsWidget;
})();
