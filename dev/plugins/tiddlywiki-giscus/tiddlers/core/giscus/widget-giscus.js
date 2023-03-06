/* widget giscus */
(function () {
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class GiscusNodeWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.giscusConfigTiddler = '$:/plugins/oeyoews/tiddlywiki-giscus/config';
      this.config = $tw.wiki.getTiddler(this.giscusConfigTiddler)?.fields || {};
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();
      const id = this.getAttribute('id', '');
      const lang = this.getAttribute('lang', 'en');
      const theme = this.getAttribute('theme', 'light');
      if (id === '') {
        console.log(`💎 请传入正确的评论区id`);
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
      }
      console.log(`💎 当前评论区为 "${id}"`);
      const scriptNode = this.document.createElement('script');
      scriptNode.setAttribute('src', 'https://giscus.app/client.js');
      const { repo, repoId, categoryId } = this.config;
      scriptNode.setAttribute('data-repo', repo);
      scriptNode.setAttribute('data-repo-id', repoId);
      scriptNode.setAttribute('data-category', 'General');
      scriptNode.setAttribute('data-category-id', categoryId);
      scriptNode.setAttribute('data-mapping', 'specific');
      scriptNode.setAttribute('data-term', id);
      scriptNode.setAttribute('data-reactions-enabled', '1');
      scriptNode.setAttribute('data-emit-metadata', '1');
      scriptNode.setAttribute('data-input-position', 'bottom');
      scriptNode.setAttribute('data-loading', 'lazy');
      scriptNode.setAttribute('data-theme', theme);
      scriptNode.setAttribute('data-lang', lang);
      scriptNode.setAttribute('crossorigin', 'anonymous');
      scriptNode.setAttribute('async', 'true');
      // 清除其他评论区节点的 giscus class
      const commentNodes = this.document.querySelectorAll('.giscus');
      for (let i = 0, len = commentNodes.length; i < len; i++) {
        commentNodes[i].classList.remove('giscus');
      }
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
