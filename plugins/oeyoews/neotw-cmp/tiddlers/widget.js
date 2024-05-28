/*\
title: $:/plugins/oeyoews/neotw-cmp/widget.js
type: application/javascript
module-type: widget

neotw-cmp widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class AutoCompleteWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  debouncePromise(fn, time = 300) {
    let timerId = undefined;

    return function debounced(...args) {
      if (timerId) {
        clearTimeout(timerId);
      }

      return new Promise((resolve) => {
        timerId = setTimeout(() => resolve(fn(...args)), time);
      });
    };
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const createElement = $tw.utils.domMaker;
    const domNode = document.createElement('div');

    const openCmp = () => {
      domNode.style.display = '';
      const input = window.document.querySelector('#autocomplete-0-input');
      if (input) {
        input.focus();
      }
      this.document.body.style.overflow = 'hidden';
    };

    const closeCmp = () => {
      this.document.body.style.overflow = '';
      domNode.style.display = 'none';
    };

    // 注册事件
    $tw.rootWidget.addEventListener('open-cmp', openCmp);

    const aut = require('./autocomplete');

    // dark:invert
    const layout = createElement('div', {
      class:
        'z-[9999] bg-white transform shadow-lg py-2 fixed left-1/2 top-24 -translate-x-1/2 w-2/3 rounded transition-all w-3/4 md:w-1/2',
    });

    const app = createElement('div', {
      attributes: {
        id: 'neotw-cmp',
      },
    });

    layout.appendChild(app);

    const debounced = this.debouncePromise(
      (items) => Promise.resolve(items),
      300,
    );

    const minSearchLength = $tw.wiki.getTiddlerText(
      '$:/config/Search/MinLength',
    );

    const previewTiddlers = (item, html) => {
      // if (!item) return html`no results`;

      const image = html`<div class="aut-tiddler"></div>`;
      const linkIcon = html`<div class="aut-arrow"></div>`;
      const tooltip = `点击跳转到${item.title}`;
      const title = html`<b>${item.title}</b>`;
      // const text = html`<div>${item.text}</div>`;
      // const text = html`<div>
      //   ${$tw.wiki.renderText(
      //     'text/html',
      //     'text/markdown',
      //     `<div> ${item.text} </div>`,
      //   )}
      // </div>`;

      return html`<div
        class="flex justify-between items-center"
        title="${tooltip}"
      >
        <div class="flex items-center justify-left gap-2">${image}${title}</div>
        <div>${linkIcon}</div>
      </div>`;
    };

    const searchResult = (item, html, data) => {
      return html`<footer
        class="mb-1 text-sm flex justify-start text-gray-500 dark:text-gray-500"
      >
        共有${Number(data.length)}条搜索结果
      </footer>`;
    };

    aut.autocomplete({
      container: app,
      placeholder: 'Search ...',
      autoFocus: true,
      openOnFocus: true,
      debug: false,
      plugins: [],
      ignoreCompositionEvents: true, // IME friendly
      defaultActiveItemId: 0,
      getSources({ query }) {
        let items = [];

        if (query.length < Number(minSearchLength - 1)) {
          return [];
        }

        items = $tw.wiki.filterTiddlers(`[!is[system]search[${query}]]`);
        items = items.map((item) => $tw.wiki.getTiddler(item).fields);

        const length = items.length;

        return debounced([
          {
            sourceId: 'LocalTiddlers',
            templates: {
              header({ item, html }) {
                // Dynamic
                return searchResult(item, html, { length });
              },
              // footer(){},
              item({ item, html }) {
                return previewTiddlers(item, html);
              },
            },

            // tiddler 点击跳转
            onSelect(e) {
              closeCmp();
              e.item.title && new $tw.Story().navigateTiddler(e.item.title);
            },

            getItems() {
              return items;
              // return items.filter(({ title }) =>
              //   title.toLowerCase().includes(query.toLowerCase()),
              // );
            },

            // getItemUrl({ item }) {
            //   return `#` + encodeURIComponent(item.title);
            // },

            // getItemInputValue({ item }) {
            //   return item.title;
            // },
          },
        ]);
      },
    });

    const masklayer = createElement('div', {
      class:
        'opacity-0 backdrop-blur-lg z-[9998] fixed inset-0 bg-black/20 transition-all cursor-pointer opacity-100',
    });
    masklayer.title = '点击关闭搜索面板';

    domNode.append(masklayer, layout);

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);

    closeCmp();
    masklayer.addEventListener('click', () => {
      closeCmp();
    });
  }
}

/** @description neotw-cmp widget */
exports['neotw-cmp'] = AutoCompleteWidget;
