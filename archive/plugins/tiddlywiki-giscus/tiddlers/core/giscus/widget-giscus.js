/*\
title: $:/plugins/oeyoews/tiddlywiki-giscus/widget-giscus.js
type: application/javascript
module-type: widget

gisucs widget
\*/
(function () {
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

      const { id, lang = 'en', theme = 'light' } = this.attributes;

      const giscusConfigTiddler = '$:/plugins/oeyoews/tiddlywiki-giscus/config';
      const config = $tw.wiki.getTiddler(giscusConfigTiddler)?.fields || {};

      if (!id) {
        const warnNode = $tw.utils.domMaker('center', {
          text: '💎 未正确配置Giscus Id',
          class: 'text-red-500 font-bold text-xl',
          attributes: {
            style: 'color: red ; font-size: 20px; font-weight: bold;',
          },
        });
        parent.insertBefore(warnNode, nextSibling);
        this.domNodes.push(warnNode);
        return;
      }

      // 如果已经存在相同 id 的评论区，直接返回
      const existingCommentNode = this.document.querySelector(
        `.oeyoews-giscus[tiddler-title="${id.replace('"', '\\"')}"]`,
      );
      if (existingCommentNode) {
        const warnNode = $tw.utils.domMaker('center', {
          text: '此评论区已存在，请勿重复渲染！',
          class: 'text-red-500 font-bold text-xl',
          attributes: {
            style: 'color: red ; font-size: 20px; font-weight: bold;',
          },
          children: [],
        });
        parent.insertBefore(warnNode, nextSibling);
        this.domNodes.push(warnNode);
        return;
      } else {
        console.log(`💎 当前评论区为 "${id}"`);
      }
      const scriptNode = this.document.createElement('script');
      scriptNode.setAttribute('src', 'https://giscus.app/client.js');
      parent.insertBefore(scriptNode, nextSibling);
      this.domNodes.push(scriptNode);

      const options = {
        'data-repo': config.repo,
        'date-repo-id': config.repoId,
        'data-category-id': config.categoryId,
        'data-term': id,
        'data-theme': theme,
        'data-lang': lang,
        'data-category': 'General',
        'data-mapping': 'specific',
        'data-reactions-enabled': '1',
        'data-loading': 'lazy',
        crossorigin: 'anonymous',
        async: 'true',
      };

      options.forEach(option => {
        scriptNode.setAttribute(option, options[option]);
      });

      const commentNode = $tw.utils.domMaker('div', {
        text: 'div',
        class: 'giscus oeyoews-giscus',
        attributes: {
          ['tiddler-title']: id,
        },
      });
      parent.insertBefore(commentNode, nextSibling);
      this.domNodes.push(commentNode);
    }
  }

  exports.giscus = GiscusNodeWidget;
})();
