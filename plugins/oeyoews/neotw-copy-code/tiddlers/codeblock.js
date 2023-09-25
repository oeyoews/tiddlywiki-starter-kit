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
      let fileType = this.language;
      // 排除一些文件类型, 不要修改默认输出, 比如会影响text/css, 导致样式失效
      if (
        fileType.startsWith('text/') ||
        fileType.startsWith('image/') ||
        fileType.startsWith('application/')
      ) {
        fileType = '';
      }
      const classNames =
        'absolute scale-0 group-hover:scale-100 overflow-auto fixed top-0 right-0 bg-transparent group-hover:bg-gray-200 group-hover:dark:bg-gray-700 transition-all duration-600 ease-in-out p-1 flex flex-row rounded backdrop-blur p-1';

      const copyButton = this.document.createElement('button');

      codeNode.appendChild(this.document.createTextNode(code));

      domNode.appendChild(codeNode);

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);

      if (this.postRender) {
        this.postRender();
      }

      // patch: must be called after postrender
      domNode.className = 'relative group p-1';
      codeNode.textContent && domNode.appendChild(copyButton);
      copyButton?.classList?.add(...classNames.split(' '));
      // https://tiddlywiki.com/#View%20Template%20Body%20Cascade:%5B%5BView%20Template%20Body%20Cascade%5D%5D%20%24%3A%2Fcore%2Fui%2FViewTemplate%2Fbody%2Fplugin
      // https://talk.tiddlywiki.org/t/how-highlight-js-works-on-codeblock/8083/11
      copyButton.textContent = fileType;

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
        html: 'html5', // html language-xml bug
        vbnet: 'visualbasic',
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
        navigator?.clipboard?.writeText(codeNode.textContent).then(() => {
          copyButton.textContent = 'copied';
          setTimeout(() => {
            console.log('update');
            copyButton.textContent = fileType;
            copyButton.appendChild(fileIcon);
          }, 1000);
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
