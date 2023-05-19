/*\
title: $:/plugins/oeyoews/neotw-unsplash/widget.js
type: application/javascript
module-type: widget

neotw-unsplash widget

\*/
(function () {
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class UnsplashWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    // 创建搜索栏和搜索按钮
    createSearchBar() {
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

      return { searchInput, searchBtn };
    }

    // 在 Unsplash 上搜索照片
    async searchPhotos(query) {
      const apiKey = window.localStorage.getItem('unsplashApiKey') || '';
      if (!apiKey) {
        const input = window.prompt('Please enter your Unsplash API Key:', '');
        if (input) {
          window.localStorage.setItem('unsplashApiKey', input.trim());
        }
      }
      const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.results;
    }

    // 创建一个照片元素
    createPhotoElement(photo) {
      const element = document.createElement('div');
      element.classList.add(
        'w-full',
        'md:w-1/2',
        'lg:w-1/3',
        'p-2',
        'flex',
        'flex-col',
        'items-center',
        'justify-start',
      );
      element.innerHTML = `
        <div class="w-full h-64 bg-cover bg-center rounded-lg shadow-lg hover:scale-105 duration-300 transition" style="background-image: url(${photo.urls.small})"></div>
        <div class="mb-1 text-xs my-2 text-slate-500">${photo.alt_description}</div>
        <div class="w-full -mt-8 p-6 my-2">
          <button class="bg-blue-400 hover:bg-blue-500 text-white p-1 rounded-sm focus:outline-none focus:shadow-outline hover:scale-105 duration-300 transition" data-photo-url="${photo.urls.regular}">
            Copy
          </button>
        </div>
      `;

      // 监听复制图片 URL 的按钮点击事件
      const copyBtn = element.querySelector('button');
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(copyBtn.dataset.photoUrl);
      });

      return element;
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const unsplashNode = this.document.createElement('div');
      unsplashNode.id = 'unsplashApp';

      // 创建搜索栏和搜索按钮
      const { searchInput, searchBtn } = this.createSearchBar();

      const resultsContainer = document.createElement('div');
      resultsContainer.classList.add(
        'flex',
        'flex-wrap',
        'justify-center',
        'my-4',
      );

      const searchContainer = document.createElement('div');
      searchContainer.classList.add('text-center');

      // 将搜索栏、照片结果列表和文本编辑器添加到页面主体中
      unsplashNode.appendChild(searchContainer);
      unsplashNode.appendChild(resultsContainer);

      parent.insertBefore(unsplashNode, nextSibling);
      this.domNodes.push(unsplashNode);

      // 将搜索栏和搜索按钮添加到容器元素中
      searchContainer.appendChild(searchInput);
      searchContainer.appendChild(searchBtn);

      // 初始化搜索栏内容为 localStorage 中存储的值
      const savedQuery = window.localStorage.getItem('unsplashSearchQuery');
      if (savedQuery) {
        searchInput.value = savedQuery;
        performSearch();
      }

      // 在 Unsplash 上搜索照片
      async function performSearch() {
        resultsContainer.innerHTML = '';
        const query = searchInput.value.trim();

        if (!query) {
          return;
        }

        // 将搜索关键字存储到 localStorage 中
        window.localStorage.setItem('unsplashSearchQuery', query);

        try {
          const photos = await this.searchPhotos(query);

          photos.forEach(photo => {
            const element = this.createPhotoElement(photo);
            resultsContainer.appendChild(element);
          });
        } catch (error) {
          console.log(error);
        }
      }

      // 创建 debounce 函数
      function debounce(fn, delay) {
        let timerId;
        return function (...args) {
          const context = this;
          clearTimeout(timerId);
          timerId = setTimeout(() => fn.apply(context, args), delay);
        };
      }

      // 监听搜索栏输入框的键盘事件
      searchInput.addEventListener(
        'keyup',
        debounce(performSearch.bind(this), 1000),
      );

      // 监听点击搜索按钮的事件
      searchBtn.addEventListener(
        'click',
        debounce(performSearch.bind(this), 1000),
      );
    }
  }

  exports['unsplash'] = UnsplashWidget;
})();
