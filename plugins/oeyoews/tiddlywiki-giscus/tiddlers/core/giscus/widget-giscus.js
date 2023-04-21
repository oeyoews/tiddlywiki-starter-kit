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

      const { id = '', lang = 'en', theme = 'light' } = this.attributes;

      const giscusConfigTiddler = '$:/plugins/oeyoews/tiddlywiki-giscus/config';
      const config = $tw.wiki.getTiddler(giscusConfigTiddler)?.fields || {};

      if (id === '') {
        console.log(`💎 请传入正确的评论区id`);
        const warnNode = this.document.createElement('center');
        warnNode.style.color = 'red';
        warnNode.style.fontWeight = 'bold';
        warnNode.textContent = '💎 未正确配置Giscus Id';
        parent.insertBefore(warnNode, nextSibling);
        this.domNodes.push(warnNode);
        console.warn('未正确配置Giscus Id');
        return;
      }

      // 如果已经存在相同 id 的评论区，直接返回
      const existingCommentNode = this.document.querySelector(
        `.oeyoews-giscus[tiddler-title="${id.replace('"', '\\"')}"]`,
      );
      if (existingCommentNode) {
        console.warn(`💎 评论区 "${id}" 已存在`);
        // 如果已经存在评论区，则在插件所在的位置添加一个 span 元素，内容为警告信息
        const warnNode = this.document.createElement('center');
        warnNode.style.color = 'red';
        warnNode.style.fontWeight = 'bold';
        warnNode.textContent = '此评论区已存在，请勿重复渲染！';
        parent.insertBefore(warnNode, nextSibling);
        this.domNodes.push(warnNode);
        console.warn('此评论区已存在，请勿重复渲染！');
        return;
      } else {
        console.log(`💎 当前评论区为 "${id}"`);
      }
      const scriptNode = this.document.createElement('script');
      scriptNode.setAttribute('src', 'https://giscus.app/client.js');
      // for field, cant get xxx-xxx with middle line variables
      // use single file json
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

      for (let data in options) {
        scriptNode.setAttribute(data, options[data]);
      }

      // 清除其他评论区节点的 giscus class
      const commentNodes = this.document.querySelectorAll('.giscus');
      for (let i = 0, len = commentNodes.length; i < len; i++) {
        commentNodes[i].classList.remove('giscus');
      }
      // scriptNode.addEventListener('load', () => {
      //   setTimeout(loadingNode.remove(), 100);
      // });
      // 创建新的评论区节点
      const commentNode = this.document.createElement('div');
      commentNode.setAttribute('class', 'giscus oeyoews-giscus');
      commentNode.setAttribute('tiddler-title', id);
      parent.insertBefore(commentNode, nextSibling);
      this.domNodes.push(commentNode);

      parent.insertBefore(scriptNode, nextSibling);
      this.domNodes.push(scriptNode);
    }
    execute() {}

    refresh() {
      var changedAttributes = this.computeAttributes();
      if (Object.keys(changedAttributes).length > 0) {
        this.refreshSelf();
        return true;
      } else {
        return false;
      }
    }
  }

  exports.giscus = GiscusNodeWidget;
})();
