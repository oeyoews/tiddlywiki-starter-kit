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
        'gap-3',
      );

      function createCard(title, cover) {
        const item = document.createElement('div');
        item.classList.add('flex', 'flex-col', 'items-center', 'group');
        const a = document.createElement('a');
        a.classList.add('text-black', 'truncate', 'group-hover:underline');
        a.setAttribute('href', `#${title}`);
        a.textContent = title;
        item.appendChild(a);
        const img = new Image();
        img.classList.add(
          'w-48',
          'h-48',
          'rounded-sm',
          'group-hover:scale-105',
          'transition',
          'duration-400',
          'ease-in-out',
        );
        img.src = cover;
        item.appendChild(img);
        return item;
      }

      data.forEach((item) => {
        container.appendChild(createCard(item.title, item.cover));
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
