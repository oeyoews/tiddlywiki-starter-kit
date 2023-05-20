/*\
title: $:/plugins/oeyoews/neotw-algolia/widget.js
type: application/javascript
module-type: widget

neotw-algolia widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const algoliasearch = require('algoliasearch.min.js');
  const instantsearch = require('instantsearch.min.js');

  class AlgoliaWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const algoliaContainer = this.document.createElement('div');
      const searchBox = this.document.createElement('div');
      searchBox.id = 'searchbox';
      searchBox.classList.add('text-center', 'inline');
      const hits = this.document.createElement('div');
      hits.id = 'hits';
      algoliaContainer.appendChild(searchBox);
      algoliaContainer.appendChild(hits);

      parent.insertBefore(algoliaContainer, nextSibling);
      this.domNodes.push(algoliaContainer);

      const searchClient = algoliasearch(
        '4FWICIJLKQ',
        'ce2d51bbd039ce8557c4e1f9ae8d871d',
      );
      const indexName = this.getAttribute('indexName', 'neotw');
      const search = instantsearch({
        indexName,
        searchClient,
        maxValuesPerFacet: 10, // 最多显示10个facet值
      });
      const container = this.getAttribute('container', '#searchbox');

      search.addWidgets([
        instantsearch.widgets.searchBox({
          container,
        }),

        // <p class="text-gray-800 line-clamp-3">{{{_highlightResult.modified.value}}}</p>
        // <p class="text-gray-800 line-clamp-3">{{{_highlightResult.text.value}}}</p>
        /* <a href="#{{{_highlightResult.tags.value}}}" class="text-gray-800 rounded-md font-bold py-1 inline">{{{_highlightResult.tags.value}}}</a> */

        /* <div class="w-1/5 pl-4">
                  <img
                    src="${hit.page - cover}"
                    class="rounded"
                  />
                </div> */
        // ${hit.title}
        // <p class="text-gray-800 mt-2">${hit.tags}</p>
        instantsearch.widgets.hits({
          container: '#hits',
          hitsPerPage: 10,
          templates: {
            item(hit) {
              return `
              <div class="flex rounded p-2 transition duration-300">
                <div class="w-4/5">
                  <a
                    href="#${hit.title}"
                    class="mb-2 truncate text-xl font-semibold capitalize"
                  >
                  ${hit._highlightResult.title.value}
                  </a>
                  <p class="text-gray-800 line-clamp-3">${hit._highlightResult.text.value}</p>
                </div>
              </div>`;
            },
          },
        }),
      ]);

      search.start();
    }
  }

  exports.algolia = AlgoliaWidget;
})();
