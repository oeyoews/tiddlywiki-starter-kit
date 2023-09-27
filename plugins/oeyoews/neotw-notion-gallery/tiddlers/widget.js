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
      this.realFilter = null;
      this.state = {
        tiddlersLength: null,
      };
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

      // TODO: 支持filter interface ui
      this.realFilter = this.getAttribute('filter', this.defaultFilter);
      const filter = this.realFilter;
      const recentTiddlers = wiki.filterTiddlers(filter).filter((tiddler) => {
        return !tiddler.fields?.['draft.of'];
      });

      const loadData = (tiddlers) => {
        return tiddlers.slice(0, this.maxCards).map((tiddler) => {
          const { fields } = wiki.getTiddler(tiddler) || { fields: {} };
          if (!fields) return;
          let cover = fields[imageField];
          let icon = fields['page-icon'];
          if (!cover || !cover.startsWith('http')) {
            cover = `${imageSource}/${resoultion}?fm=blurhash&${fields.title}`;
          }
          return {
            title: fields?.title,
            cover,
            icon,
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

      // TODO: 分页
      if (recentTiddlers.length > this.maxCards) {
        console.warn(
          `${recentTiddlers.length} 张卡片即将渲染, 超过最大限制 ${this.maxCards}, 仅渲染前三十张卡片 @neotw-notion-gallery`,
        );
      }

      const data = loadData(recentTiddlers);

      data.forEach(({ title, cover, icon }) => {
        const isExist = $tw.wiki.tiddlerExists(title);
        if (!isExist) return;
        container.appendChild(createCard(title, cover, navigate, icon));
      });

      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);
    }

    // 如果更新tiddler进行重新渲染
    isChanged(changedTiddlers) {
      // 获取最新的tiddlers列表
      let recentTiddlers = $tw.wiki
        .filterTiddlers(this.realFilter)
        .filter((title) => {
          // 必须过滤draft, 否则会一直刷新
          return !title.startsWith('Draft of');
        });
      const valuesToCheck = Object.keys(changedTiddlers).filter((title) => {
        return !(title.startsWith('$:/') || title.startsWith('Draft of'));
      });

      const isChanged = valuesToCheck.some((value) =>
        recentTiddlers.includes(value),
      );
      return isChanged;
    }

    refresh(changedTiddlers) {
      console.log(changedTiddlers);
      const isChanged = this.isChanged(changedTiddlers);
      if (isChanged) {
        this.refreshSelf(); // 重新渲染
      }
    }
  }

  /**
   * @description notion-gallery widget
   * @param {string} filter
   */
  exports.cards = cardsWidget;
})();
