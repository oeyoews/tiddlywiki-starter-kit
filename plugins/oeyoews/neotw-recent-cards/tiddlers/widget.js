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

      const defaultFilter = '[!is[system]!has[draft.of]!sort[created]limit[9]]';
      const filter = this.getAttribute('filter', defaultFilter);
      const recentTiddlers = wiki.filterTiddlers(filter);

      const data = recentTiddlers.map((tiddler) => {
        const { fields } = wiki.getTiddler(tiddler);
        const cover =
          fields['page-cover'] ||
          `https://source.unsplash.com/random/1920x1080?fm=blurhash&${fields.title}`;
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
        'my-4',
      );

      // 必须使用箭头函数
      // 会触发notebook的closing
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
        item.addEventListener('click', () => navigate(title));
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.classList.add(
          'aspect-video',
          'object-cover',
          'w-full',
          'h-full',
          'rounded-md',
          // 'bg-gradient-to-r', 'from-teal-100', 'to-lime-200',
          'group-hover:scale-105',
          'transition-all',
          'duration-800',
          'ease-in-out',
          'scale-105',
          'blur-lg',
          'bg-black/10',
        );

        // img.src =
        //   'https://images.unsplash.com/photo-1505860125062-3ce932953cf5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=270&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm0sc2VhfHx8fHx8MTY5NTEzNjk4NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=480';

        img.alt = title;
        img.src = cover;
        item.appendChild(img);
        img.onload = () => {
          img.classList.remove('scale-105', 'blur-lg', 'bg-black/10');
          item.appendChild(h3);
        };

        return item;
      }

      data.forEach(({ title, cover }) => {
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
