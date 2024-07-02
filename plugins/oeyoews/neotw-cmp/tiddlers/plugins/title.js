/*\
title: $:/plugins/oeyoews/neotw-cmp/plugins/title.js
type: application/javascript
module-type: library

\*/

const { debounced } = require('./utils');
const { closeCmp } = require('./utils');
const cmds = {
  cmd: '>',
  help: '?',
  empty: '',
};
const cmdsString = Object.values(cmds);

const goto = new $tw.Story();

const minSearchLength = $tw.wiki.getTiddlerText('$:/config/Search/MinLength');

const actions = [
  {
    title: '跳转到主页',
    action: 'home',
  },
];

const links = [
  {
    title: 'TiddlyWiki GitHub',
    link: 'https://github.com/Jermolene/TiddlyWiki5',
  },
  {
    title: 'TiddlyWiki 中文文档',
    link: 'https://bramchen.github.io/tw5-docs/zh-Hans/',
  },
  {
    title: 'TiddlyWiki 官方论坛',
    link: 'https://talk.tiddlywiki.org/',
  },
];

let mode = '';

function Plugin(domNode) {
  return {
    getSources({ query, setQuery, refresh, setContext }) {
      let items = [];
      switch (query) {
        case '':
        case cmds.help:
          items = [...links, ...actions];
          mode = 'help';
          break;
        case cmds.cmd:
          mode = 'cmd';
          items = [
            {
              title: '开发者',
              action: '',
            },
          ];
          break;
        default:
          mode = 'tiddler';
          if (query.trim().length >= Number(minSearchLength - 1)) {
            items = $tw.wiki.filterTiddlers(
              `[!is[system]search[${query.trim()}]]`,
            );
            items = items.map((item) => $tw.wiki.getTiddler(item).fields);
          }
      }

      const length = items.length;

      // https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/
      return debounced([
        {
          sourceId: 'LocalTiddlers',
          templates: {
            header({ item, html }) {
              if (cmdsString.includes(query)) return;
              // return searchResult(item, html, { length, query });
              return searchHelp(item, html);
            },
            item({ item, html }) {
              return previewTiddlers(item, html, query);
            },
            noResults({ item, html }) {
              return noResults(item, html);
            },
          },

          onSelect({ item }) {
            closeCmp(domNode); // hide modal

            const invoke = (action, param) => {
              const paramString = param || '';
              const actionString = `<$action-sendmessage $message="${action}" $param="${paramString}"/>`;
              console.log(actionString);
              return $tw.rootWidget.invokeActionString(actionString);
            };

            if (item.link) {
              window.open(item.link, item.link);
              return;
            }

            if (item.action) {
              switch (item.action) {
                case 'home':
                  goto.navigateTiddler('GettingStarted');
                  break;
                default:
              }
              return;
            }

            item.title && goto.navigateTiddler(item.title);
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

const previewTiddlers = (item, html, query) => {
  const image = html`<div class="${mode}"></div>`;

  const linkIcon = html`<div class="arrow"></div>`;
  const tooltip = `点击跳转到${item.title}`;

  const title = html(item.title);

  // const position = item.title.indexOf(query);

  // NOTE: 搜索结果不是按照title
  // const title =
  //   mode === 'tiddler' && query && item.title
  //     ? item.title.slice(0, position) +
  //       `<b>${query}</b>` +
  //       item.title.slice(position + query.length - 1, item.title.length)
  //     : item.title;

  return html`<div class="flex justify-between items-center" title="${tooltip}">
    <div class="flex items-center justify-left gap-2">${image}${title}</div>
    <div>${linkIcon}</div>
  </div>`;
};

const searchHelp = (item, html) => {
  return html`<div class="flex items-center gap-2">
  <kbd class="arrow-up"></kbd>
  <kbd class="arrow-down"></kbd>
   <span class="text-[12px]"> 切换 </span>
   <kbd class="down-left"></kbd>
   <span class="text-[12px]"> 选择 </span>
  </div>`
}

const searchResult = (item, html, data) => {
  return html`<footer
    class="mb-1 text-sm flex justify-start text-gray-500 dark:text-gray-500"
  >
    <mark>${data.query}</mark> 共有 <b> ${Number(data.length)} </b> 条搜索结果
  </footer>`;
};

const { version } = $tw.wiki.getTiddler('$:/plugins/oeyoews/neotw-cmp').fields;

const noResults = (item, html) => {
  return html`<div class="text-center text-sm">无法搜索到相关内容</div>`;
};

module.exports = Plugin;
