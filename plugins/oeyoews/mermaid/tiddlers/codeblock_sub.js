/*\
title: $:/plugins/oeyoews/mermaid/codeblock_sub.js
type: application/javascript
module-type: widget-subclass

codeblock subclass to support the render mermaid

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.baseClass = 'codeblock'; // Extend the <$checkbox> widget

  // Specify a different name to make the subclass available as a new widget instead of overwriting the baseclass:
  // exports.name = "my-enhanced-checkbox";

  exports.constructor = function (parseTreeNode, options) {
    this.initialise(parseTreeNode, options);
  };

  exports.prototype = {};
  exports.prototype.render = function (parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    var codeNode = this.document.createElement('code'),
      domNode = this.document.createElement('pre');
    codeNode.appendChild(
      this.document.createTextNode(this.getAttribute('code')),
    );
    domNode.appendChild(codeNode);
    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
    if (this.postRender) {
      this.postRender();
    }
    // 修复 readme fetch error
    if (this.mermaidRender && $tw.browser && !domNode?.isTiddlyWikiFakeDom) {
      this.mermaidRender();
    }
  };
})();
