/*\
title: $:/plugins/oeyoews/neotw-unsplash/widget.js
type: application/javascript
module-type: widget

neotw-unsplash widget

\*/
(function() {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class UnsplashWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      // secret
      const param = this.getAttribute('param', 'Test Param');

      const unsplashNode = this.document.createElement('div');
      unsplashNode.id = 'unsplashApp';

      const searchBtn = document.createElement('button');
      const resultsContainer = document.createElement('div');
      const searchContainer = document.createElement('div');

      // 创建文本编辑器
      const editor = document.createElement('textarea');
      editor.id = 'editor';

      // 将搜索栏、照片结果列表和文本编辑器添加到页面主体中
      unsplashNode.appendChild(searchBtn);
      unsplashNode.appendChild(resultsContainer);
      unsplashNode.appendChild(searchContainer);
      unsplashNode.appendChild(editor);

      parent.insertBefore(unsplashNode, nextSibling);
      this.domNodes.push(unsplashNode);

      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.id = 'search-input';
      searchInput.placeholder = 'Search photos...';

      // 创建搜索按钮
      searchBtn.id = 'search-btn';
      searchBtn.textContent = 'Search';

      // 创建照片结果列表
      resultsContainer.classList.add('results-container');

      // 将搜索栏和搜索按钮添加到容器元素中
      searchContainer.classList.add('search-container');
      searchContainer.appendChild(searchInput);
      searchContainer.appendChild(searchBtn);

      // 在 Unsplash 上搜索照片
      async function searchPhotos(query) {
        const apiKey = 'baKbPgwlhbBfF7mHcGf0DS0TmFzi8GknZ4hbUhuNkrA';
        const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          return data.results;
        } catch (error) {
          console.log(error);
        }
      }

      // 将照片插入到编辑器中
      function insertPhoto(photoUrl) {
        const currentText = editor.value;
        // editor.value = currentText + `![Unsplash photo](${photoUrl})`;
        editor.value = currentText + `<img src="${photoUrl}" />`;
      }

      // 监听搜索按钮的点击事件
      searchBtn.addEventListener('click', async () => {
        resultsContainer.innerHTML = '';
        const query = searchInput.value.trim();

        if (!query) {
          return;
        }

        const photos = await searchPhotos(query);

        photos.forEach(photo => {
          const element = document.createElement('div');
          element.classList.add('results-item');
          element.innerHTML = `<img src="${photo.urls.small}" alt="${photo.alt_description}" />`;

          // 监听照片的点击事件，将其插入到编辑器中
          element.addEventListener('click', () => {
            insertPhoto(photo.urls.regular);
          });

          resultsContainer.appendChild(element);
        });
      });
    }
  }

  exports['unsplash'] = UnsplashWidget;
})();
