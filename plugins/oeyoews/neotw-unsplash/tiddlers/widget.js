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

      const unsplashNode = this.document.createElement('div');
      unsplashNode.id = 'unsplashApp';

      const searchBtn = document.createElement('button');
      searchBtn.id = 'search-btn';
      searchBtn.textContent = 'Search';
      searchBtn.classList.add(
        'bg-blue-500',
        'hover:bg-blue-600',
        'text-white',
        'font-semibold',
        'py-2',
        'px-4',
        'mx-2',
        'rounded',
        'shadow',
        'transition',
        'duration-200',
      );
      const resultsContainer = document.createElement('div');
      const searchContainer = document.createElement('div');
      searchContainer.classList.add('text-center');

      // 将搜索栏、照片结果列表和文本编辑器添加到页面主体中
      unsplashNode.appendChild(searchBtn);
      unsplashNode.appendChild(searchContainer);
      unsplashNode.appendChild(resultsContainer);

      parent.insertBefore(unsplashNode, nextSibling);
      this.domNodes.push(unsplashNode);

      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.id = 'search-input';
      searchInput.placeholder = 'Search photos...';
      searchInput.classList.add(
        'w-4/5',
        'px-3',
        'py-2',
        'bg-white',
        'border',
        'border-gray-300',
        'rounded',
        'shadow-sm',
        'focus:outline-none',
        'focus:border-blue-300',
      );

      // 创建搜索按钮
      searchBtn.id = 'search-btn';
      searchBtn.textContent = 'Search';

      // 创建照片结果列表
      resultsContainer.classList.add(
        'grid',
        'grid-cols-4',
        'overflow-auto',
        'gap-4',
        'rounded-lg',
        'my-4',
      );

      // 将搜索栏和搜索按钮添加到容器元素中
      searchContainer.appendChild(searchInput);
      searchContainer.appendChild(searchBtn);

      // 在 Unsplash 上搜索照片
      function searchPhotos(query) {
        return new Promise((resolve, reject) => {
          const apiKey = window.localStorage.getItem('unsplashApiKey') || '';
          if (!apiKey) {
            const input = window.prompt(
              'Please enter your Unsplash API Key:',
              '',
            );
            if (input) {
              window.localStorage.setItem('unsplashApiKey', input.trim());
            }
          }
          const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`;
          fetch(apiUrl)
            .then(response => response.json())
            .then(data => resolve(data.results))
            .catch(error => reject(error));
        });
      }

      // 点击图片复制图片 URL 到粘贴板
      function copyPhotoUrl(photoUrl) {
        const image = `<img src="${photoUrl}" />`;
        navigator.clipboard.writeText(image);
      }

      function debounce(fn, delay) {
        let timerId;
        return function(...args) {
          const context = this;
          clearTimeout(timerId);
          timerId = setTimeout(() => fn.apply(context, args), delay);
        };
      }

      searchBtn.addEventListener(
        'click',
        debounce(async () => {
          resultsContainer.innerHTML = '';
          const query = searchInput.value.trim();

          if (!query) {
            return;
          }

          // 将搜索关键字存储到 localStorage 中
          window.localStorage.setItem('unsplashSearchQuery', query);

          try {
            const photos = await searchPhotos(query);

            photos.forEach(photo => {
              const element = document.createElement('div');
              element.classList.add('w-56', 'h-56');
              element.innerHTML = `<img src="${photo.urls.small}" alt="${photo.alt_description}" />`;

              // 监听照片的点击事件，将其插入到编辑器中，并复制到粘贴板
              element.addEventListener('click', () => {
                // insertPhoto(photo.urls.regular);
                copyPhotoUrl(photo.urls.regular);
              });

              resultsContainer.appendChild(element);
            });
          } catch (error) {
            console.log(error);
          }
        }),
        1000,
      );

      // 监听搜索栏输入框的键盘事件，支持回车搜索
      searchInput.addEventListener(
        'keyup',
        debounce(async () => {
          resultsContainer.innerHTML = '';
          const query = searchInput.value.trim();

          if (!query) {
            return;
          }

          // 将搜索关键字存储到 localStorage 中
          window.localStorage.setItem('unsplashSearchQuery', query);

          try {
            const photos = await searchPhotos(query);

            photos.forEach(photo => {
              const element = document.createElement('div');
              element.classList.add('w-56', 'h-56', 'm-1');
              element.innerHTML = `<img src="${photo.urls.small}" alt="${photo.alt_description}" />`;

              // 监听照片的点击事件，将其插入到编辑器中
              element.addEventListener('click', () => {
                // insertPhoto(photo.urls.regular);
                copyPhotoUrl(photo.urls.regular);
              });

              resultsContainer.appendChild(element);
            });
          } catch (error) {
            console.log(error);
          }
        }),
        1000,
      );

      // 初始化搜索栏内容为 localStorage 中存储的值
      const savedQuery = window.localStorage.getItem('unsplashSearchQuery');
      if (savedQuery) {
        searchInput.value = savedQuery;
      }
    }
  }

  exports['unsplash'] = UnsplashWidget;
})();
