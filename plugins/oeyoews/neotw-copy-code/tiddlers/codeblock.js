/*\
title: $:/core/modules/widgets/codeblock.js
type: application/javascript
module-type: widget

Code block node widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  var Widget = require('$:/core/modules/widgets/widget.js').widget;

  class CodeBlockWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const domNode = this.document.createElement('pre');
      const codeNode = this.document.createElement('code');
      const code = this.getAttribute('code', '');
      // const fileType = this.language;
      const classNames =
        'absolute fixed top-0 right-0 delay-200 bg-transparent hover:bg-gray-200 transition-all duration-600 ease-in-out p-1 flex flex-row';

      const copyButton = this.document.createElement('button');

      codeNode.appendChild(this.document.createTextNode(code));

      domNode.appendChild(codeNode);

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);

      if (this.postRender) {
        this.postRender();
      }

      // patch: must be called after postrender
      domNode.className = 'relative group';
      codeNode.textContent && domNode.appendChild(copyButton);
      copyButton?.classList?.add(...classNames.split(' '));
      // BUG: plugin template has extra filetype text/plain ??? 这个模板用到了codeblock ???
      // copyButton.textContent = fileType || 'copy';

      // icon
      const fileIcon = this.document.createElement('iconify-icon');
      let standardIconLanguage =
        codeNode.className.match(/language-(\w+)/)?.[1] || '';
      const languageMapping = {
        bash: 'gnubash',
        css: 'css3',
        cpp: 'cplusplus',
        java: 'openjdk',
        ini: 'toml',
        dockerfile: 'docker',
        scss: 'sass',
        makefile: 'cmake',
        sql: 'mysql',
        // html: 'html5', // html language-xml bug
        xml: 'html5',
        '': 'tiddlywiki',
      };
      if (standardIconLanguage in languageMapping) {
        standardIconLanguage = languageMapping[standardIconLanguage];
      }

      fileIcon.setAttribute('icon', `simple-icons:${standardIconLanguage}`);
      fileIcon.className = 'mx-1';
      copyButton.appendChild(fileIcon);

      copyButton.addEventListener('click', () => {
        // NOTE: 0.0.0.0:xxx 自动禁用clipboard, 导致无法复制
        // ~~IOS 并不支持navigator, 目前不打断写兼容代码~~ ???
        navigator?.clipboard?.writeText(codeNode.textContent).then(() => {
          copyButton.textContent = '✅';
          setTimeout(() => {
            // copyButton.textContent = fileType || 'copy';
            copyButton.textContent = '';
            copyButton.appendChild(fileIcon);
          }, 2000);
        });
      });
    }

    execute() {
      this.language = this.getAttribute('language');
    }

    refresh(changedTiddlers) {
      const changedAttributes = this.computeAttributes();
      if (changedAttributes.code || changedAttributes.language) {
        this.refreshSelf();
        return true;
      } else {
        return false;
      }
    }
  }

  exports.codeblock = CodeBlockWidget;
})();
