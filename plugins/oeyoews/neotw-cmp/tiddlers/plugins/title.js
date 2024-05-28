/*\
title: $:/plugins/oeyoews/neotw-cmp/plugins/title.js
type: application/javascript
module-type: library

\*/

const { debounced } = require('./utils');
const { closeCmp } = require('./utils');

const minSearchLength = $tw.wiki.getTiddlerText('$:/config/Search/MinLength');

function titlePlugin(domNode) {
  return {
    getSources({ query }) {
      let items = [];

      if (query.length >= Number(minSearchLength - 1)) {
        items = $tw.wiki.filterTiddlers(`[!is[system]search[${query}]]`);
        items = items.map((item) => $tw.wiki.getTiddler(item).fields);
      }

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
            closeCmp(domNode);
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
  };
}

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

  return html`<div class="flex justify-between items-center" title="${tooltip}">
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

module.exports = titlePlugin;
