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
        h3.classList.add(
          'flex',
          'justify-center',
          'items-center',
          'font-normal',
          'text-sm',
          'truncate',
          'm-0',
          'inset-0',
          'absolute',
          'w-full',
          'bg-black',
          'backdrop-blur',
          'bg-opacity-50',
          'text-white',
          'p-2',
          'rounded-md',
          'scale-0',
          'ease-in-out',
          'transition',
          'group-hover:scale-105',
        );
        h3.textContent = title;
        item.addEventListener('click', () => navigate(title));
        const img = document.createElement('img');
        const realImage = new Image();
        img.loading = 'lazy';
        img.classList.add(
          'object-cover',
          'w-full',
          'h-full',
          'rounded-md',
          'group-hover:scale-105',
          'transition-all',
          'duration-800',
          'ease-in-out',
          'cursor-pointer',
          'scale-105',
          'blur',
        );
        img.src =
          'https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm0sTmV3IFRpZGRsZXJ8fHx8fHwxNjk1MTI1MDEw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920';

        img.alt = title;
        realImage.classList.add();
        realImage.src = cover;
        realImage.onload = () => {
          img.src = cover;
          img.classList.remove('scale-105', 'blur');
        };
        img.title = '点击查看';

        item.appendChild(img);
        item.appendChild(h3);
        return item;
      }

      data.forEach(({ title, cover }) => {
        container.appendChild(createCard(title, cover));
      });

      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);
    }

    // 不要进行实时更新, unsplash 的图片不会进行缓存, 每次更新都需要进行网络请求
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
