/*\
title: $:/plugins/oeyoews/neotw-hitokoto/widget-fact.js
type: application/javascript
module-type: widget

Random Fact Widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class RandomFact extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.executing = false;
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const factNode = this.document.createElement('div');
      factNode.textContent = 'Loading...';
      factNode.classList.add(
        'text-transparent',
        'bg-clip-text',
        'bg-gradient-to-r',
        'from-green-400',
        'via-blue-500',
        'to-purple-500',
        'cursor-pointer',
        'text-xs',
        'line-clamp-1',
        'my-4',
        'inline',
      );
      parent.insertBefore(factNode, nextSibling);
      this.domNodes.push(factNode);

      const fetchRandomFact = async () => {
        const response = await fetch(
          'https://useless-facts.sameerkumar.website/api',
        );
        const { data: randomFact } = await response.json();
        factNode.textContent = randomFact;

        /* fetch('https://useless-facts.sameerkumar.website/api')
          .then(response => response.json())
          .then(data => {
            const randomFact = data.data;
            factNode.textContent = randomFact;
          })
          .catch(console.error)
          .finally(() => {
            this.executing = false;
          }); */
      };

      const _ = require('lodash.min.js');
      const throttleRandomFactHandleClick = _.throttle(
        fetchRandomFact.bind(this),
        1000,
      );

      factNode.addEventListener('click', () => {
        throttleRandomFactHandleClick();
      });
      fetchRandomFact();
    }
  }

  exports['random-fact'] = RandomFact;
})();
