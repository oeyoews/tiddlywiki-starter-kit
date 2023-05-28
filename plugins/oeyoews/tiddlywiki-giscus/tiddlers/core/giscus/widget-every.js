/*\
title: $:/plugins/oeyoews/tiddlywiki-giscus/widget-giscus-inline.js
type: application/javascript
module-type: widget

gisucs widget
\*/
(function() {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class GiscusNodeWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const { lang = 'en', theme = 'light' } = this.attributes;

      const giscusConfigTiddler = '$:/plugins/oeyoews/tiddlywiki-giscus/config';
      const config = $tw.wiki.getTiddler(giscusConfigTiddler)?.fields || {};

      const scriptNode = this.document.createElement('script');
      scriptNode.setAttribute('src', 'https://giscus.app/client.js');
      parent.insertBefore(scriptNode, nextSibling);
      this.domNodes.push(scriptNode);

      // if use https: filter this currentTiddler will be changed is https: maybe
      const tiddler = this.getAttribute('tiddler', 'GettingStarted');
      const currentTiddler = this.getVariable('currentTiddler') || tiddler;

      const options = {
        'data-repo': config.repo,
        'date-repo-id': config.repoId,
        'data-category-id': config.categoryId,
        'data-term': currentTiddler,
        'data-theme': theme,
        'data-lang': lang,
        'data-category': 'General',
        'data-mapping': 'specific',
        'data-reactions-enabled': '1',
        'data-loading': 'lazy',
        crossorigin: 'anonymous',
        async: 'true',
      };

      Object.keys(options).forEach(key => {
        scriptNode.setAttribute(key, options[key]);
      });

      const commentNode = $tw.utils.domMaker('div', {
        text: 'Loading ...',
        class: 'giscus oeyoews-giscus',
        attributes: {
          ['tiddler-title']: currentTiddler,
        },
      });
      parent.insertBefore(commentNode, nextSibling);
      this.domNodes.push(commentNode);
    }
  }

  exports['inline-giscus'] = GiscusNodeWidget;
})();
