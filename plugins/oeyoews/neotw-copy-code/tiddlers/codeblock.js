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
      // 不要加这句话, 构建library的时候需要使用到这个widget(server)
      // if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const domNode = this.document.createElement('pre');
      const codeNode = this.document.createElement('code');
      const code = this.getAttribute('code', '');
      let fileType = this.language;
      // 排除一些文件类型, 不要修改默认输出, 比如会影响text/css, 导致样式失效
      if (
        fileType?.startsWith('text/') ||
        fileType?.startsWith('image/') ||
        fileType?.startsWith('application/')
      ) {
        fileType = '';
      }
      const classNames =
        'absolute scale-0 group-hover:scale-100 overflow-auto fixed top-0 right-0 bg-transparent group-hover:bg-gray-300 group-hover:dark:bg-gray-700 transition-all duration-600 ease-in-out p-1 flex flex-row rounded backdrop-blur p-1';

      const copyButton = this.document.createElement('button');
      copyButton.style.textTransform = 'lowercase';

      codeNode.appendChild(this.document.createTextNode(code));

      domNode.appendChild(codeNode);

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);

      if (this.postRender) {
        this.postRender();
      }

      // patch: must be called after postrender
      domNode.className = 'relative group p-1 bg-neutral-200/70 dark:bg-gray-400';
      codeNode.textContent && domNode.appendChild(copyButton);
      copyButton?.classList?.add(...classNames.split(' '));
      // https://tiddlywiki.com/#View%20Template%20Body%20Cascade:%5B%5BView%20Template%20Body%20Cascade%5D%5D%20%24%3A%2Fcore%2Fui%2FViewTemplate%2Fbody%2Fplugin
      // https://talk.tiddlywiki.org/t/how-highlight-js-works-on-codeblock/8083/11
      /* 你可以这样写成 main.js, 但是目前highlgith.js 不识别文件类型
      bug: text/vnd.tiddlywiki 不能正常渲染main.js, markdown工作正常
      bug: but this editor cannot recognize correct code type, need modify relate rules
      patch:
      or pop
      var tokens = language.split('.');
      language = tokens[tokens.length - 1]; */
      copyButton.textContent = fileType;

      // icon
      const fileIcon = this.document.createElement('iconify-icon');
      let standardIconLanguage =
        codeNode.className.match(/language-(\w+)/)?.[1] || '';
      // simple-icons some special language mapping
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

      /* const { href } = window.location;
      if (href.includes('0.0.0.0')) {
        copyButton?.classList?.add('cursor-not-allowed');
        copyButton.disabled = true;
        copyButton.title = `${href} 剪切板不可用`;
      } */

      let clipboardTimer;
      copyButton.addEventListener('click', () => {
        clearTimeout(clipboardTimer);
        // clipboard api 不会向用户发出询问, 在不安全的上下文中(0.0.0.0), clipboard api 不会被允许
        const copyToClipboard = $tw.utils.copyToClipboard;
        copyToClipboard(codeNode.textContent, {
          doNotNotify: true,
        });
        copyButton.textContent = 'copied';
        clipboardTimer = setTimeout(() => {
          copyButton.textContent = fileType;
          copyButton.appendChild(fileIcon);
        }, 1000);
        /* navigator?.clipboard?.writeText(codeNode.textContent).then(() => {
          copyButton.textContent = 'copied';
          clipboardTimer = setTimeout(() => {
            copyButton.textContent = fileType;
            copyButton.appendChild(fileIcon);
          }, 1000);
        }); */
      });
    }

    execute() {
      // 不能为undefined, 否则 使用obj 的一些方法会报错(@highlightjs)
      this.language = this.getAttribute('language', '');
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
