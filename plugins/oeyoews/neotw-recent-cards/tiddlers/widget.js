/*\
title: $:/plugins/oeyoews/neotw-recent-cards/widget.js
type: application/javascript
module-type: widget

neotw-recent-cards widget

\*/
(function () {
  /*jslint node: true, browser: true */

  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class cardsWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.recentTiddlers = $tw.wiki.filterTiddlers(
        '[!is[system]!has[draft.of]!sort[created]limit[9]]',
      );
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const wiki = $tw.wiki;

      const recentTiddlers = this.recentTiddlers;

      const data = recentTiddlers.map((tiddler) => {
        const { fields } = wiki.getTiddler(tiddler);
        const cover =
          fields['page-cover'] ||
          `https://source.unsplash.com/random?fm=blurhash&w=50&${fields.title}`;
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
        'gap-4',
      );

      // 必须使用箭头函数
      const navigate = (title) => {
        this.parentWidget.dispatchEvent({
          type: 'tm-navigate',
          param: title,
          navigateTo: title,
        });
      };

      function createCard(title, cover) {
        const item = document.createElement('div');
        item.classList.add('flex', 'flex-col', 'items-center', 'group');
        const h3 = document.createElement('h3');
        h3.classList.add('text-black', 'truncate');
        h3.textContent = title;
        item.addEventListener('click', () => navigate(title));
        item.appendChild(h3);
        const img = document.createElement('img');
        img.title = '点击查看';
        img.classList.add(
          'w-full',
          'h-48',
          'rounded-sm',
          'group-hover:scale-105',
          'transition',
          'duration-400',
          'ease-in-out',
          'cursor-pointer',
        );
        img.src = cover;
        item.appendChild(img);
        return item;
      }

      data.forEach(({ title, cover }) => {
        container.appendChild(createCard(title, cover));
      });

      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);
    }

    // 不要进行实时更新
    /* refresh() {
      const recentTiddlers = $tw.wiki.filterTiddlers(
        '[!is[system]!has[draft.of]!sort[created]limit[9]]',
      );
      if (recentTiddlers[0] !== this.recentTiddlers[0]) {
        this.refreshSelf();
        console.log('updated');
      }
    } */
  }

  exports.cards = cardsWidget;
})();
