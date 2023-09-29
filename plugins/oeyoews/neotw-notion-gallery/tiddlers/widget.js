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

  const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
  const createCard = require('./createCard');
  const config = require('./config');

  class CardsWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.maxCards = config.maxCards;
      this.defaultFilter = config.defaultFilter;
      this.realFilter = null;
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

      // update realfilter
      this.realFilter = this.getAttribute('filter', this.defaultFilter);
      const cardsTiddlers = this.removedFilterDraftTiddlers();

      const prepareCardData = (tiddlers) => {
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
      const containerClassList =
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 m-4';
      // 其实可以直接使用classNames
      container.classList.add(...containerClassList.split(' '));

      // TODO: 分页
      if (cardsTiddlers.length > this.maxCards) {
        console.warn(
          `${cardsTiddlers.length} 张卡片即将渲染, 超过最大限制 ${this.maxCards}, 仅渲染前三十张卡片 @neotw-notion-gallery`,
        );
      }

      const data = prepareCardData(cardsTiddlers);

      data.forEach(({ title, cover, icon }) => {
        container.appendChild(createCard(title, cover, navigate, icon));
      });

      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);
    }

    // 如果更新或者添加了新的tiddler, 则需要重新渲染
    isChanged(changedTiddlers) {
      // 获取最新的tiddlers列表
      let cardsTiddlers = this.removedFilterDraftTiddlers();
      const { filteredTiddlers: valuesToCheck, notExistTiddlers } =
        this.removedDraftTiddlers(Object.keys(changedTiddlers));

      let isChanged = valuesToCheck.some((value) =>
        cardsTiddlers.includes(value),
      );
      // TODO: 如果删除了tiddler, 需要监听长度的变化进行渲染
      // 可以存储第一次渲染的tiddler列表, 如果删除则需要重新渲染, 但是这样不利于以后扩展动态filter
      // 如果删除了tiddler,就重新渲染, 无视过滤器
      if (notExistTiddlers.length) {
        isChanged = true;
      }
      return isChanged;
    }

    /**
     * @description remove draft.of tiddler
     * @param {Array} filterTiddlers
     */

    removedDraftTiddlers(filterTiddlers) {
      let notExistTiddlers = [];

      const filteredTiddlers = filterTiddlers.filter((title) => {
        // NOTE: 如果是系统条目, 即使存在也会返回false
        const isExist = $tw.wiki.tiddlerExists(title);

        if (!isExist) {
          notExistTiddlers.push(title);
          return false;
        }

        return !(title.startsWith('$:/') || title.startsWith('Draft of'));
      });

      return { filteredTiddlers, notExistTiddlers };
    }

    /**
     * @description remove draft.of tiddler
     * @param {string} realFilter
     */
    removedFilterDraftTiddlers(realFilter = this.realFilter) {
      const filterTiddlers = $tw.wiki.filterTiddlers(realFilter);
      return this.removedDraftTiddlers(filterTiddlers).filteredTiddlers;
    }

    refresh(changedTiddlers) {
      const isChanged = this.isChanged(changedTiddlers);
      if (isChanged) {
        this.refreshSelf(); // 重新渲染
        return true;
      } else {
        return false;
      }
    }
  }

  /**
   * @description notion-gallery widget
   * @param {string} filter
   */
  exports.cards = CardsWidget;
})();