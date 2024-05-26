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

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const aut = require('./autocomplete');
    const createElement = $tw.utils.domMaker;

    const app = createElement('div', {
      class: 'autocomplete',
    });

    aut.autocomplete({
      container: app,
      placeholder: 'Search for tiddlers',
      // autoFocus: true,
      // openOnFocus: true,
      // debug: false,
      ignoreCompositionEvents: true,
      defaultActiveItemId: 0,
      getSources({ query }) {
        let items = $tw.wiki.filterTiddlers(`[!is[system]search[${query}]]`);

        items = items.map((item) => $tw.wiki.getTiddler(item).fields);

        return [
          {
            templates: {
              header() {
                return 'Suggestions';
              },
              footer() {
                return 'footer';
              },
              item({ item, html }) {
                // if (!item) return html`no results`;

                const image = html`<div class="aut-tiddler"></div>`;
                const title = html`<b>${item.title}</b>`;
                // const text = html`<div>${item.text}</div>`;
                // const text = html`<div>
                //   ${$tw.wiki.renderText(
                //     'text/html',
                //     'text/markdown',
                //     `<div> ${item.text} </div>`,
                //   )}
                // </div>`;

                return html`<div>
                  <div class="flex items-center justify-left gap-2">
                    ${image}${title}
                  </div>
                </div>`;
              },
            },
            onSelect(e) {
              new $tw.Story().navigateTiddler(e.item.title);
            },
            sourceId: 'localItems',
            getItems() {
              return items.filter(({ title }) =>
                title.toLowerCase().includes(query.toLowerCase()),
              );
            },
            getItemUrl({ item }) {
              return `#` + encodeURIComponent(item.title);
            },
            getItemInputValue({ item }) {
              return item.title;
            },
          },
        ];
      },
    });

    const domNode = createElement('div', {
      children: [app],
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description neotw-cmp widget */
exports['widget-64xsv43d'] = AutoCompleteWidget;
