/*\
title: $:/plugins/oeyoews/neotw-cmp/plugins/title.js
type: application/javascript
module-type: library

\*/

const { debounced } = require('./utils');
const { closeCmp } = require('./utils');
// const cmds = ['> ', '#'];

const minSearchLength = $tw.wiki.getTiddlerText('$:/config/Search/MinLength');

function titlePlugin(domNode) {
  return {
    getSources({ query, setQuery, refresh, setContext }) {
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
              if (!query) return;
              return searchResult(item, html, { length, query });
            },
            item({ item, html, query }) {
              return previewTiddlers(item, html);
            },
            noResults({ item, html, query }) {
              if (!query) return;

              return noResults(item, html);
            },
          },

          // tiddler 点击跳转
          onSelect(e) {
            closeCmp(domNode);
            e.item.title && new $tw.Story().navigateTiddler(e.item.title);
          },

          getItems({ query }) {
            // if (!cmds.some((item) => query.startsWith(item))) {
            // }
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
    <mark>${data.query}</mark> 共有 <b> ${Number(data.length)} </b> 条搜索结果
  </footer>`;
};

const noResults = (item, html) => {
  return html`<div>暂无内容</div>`;
};

module.exports = titlePlugin;
