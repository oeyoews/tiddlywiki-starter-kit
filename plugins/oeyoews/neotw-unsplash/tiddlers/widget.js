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

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      // 创建搜索栏和搜索按钮
      function createSearchBar() {
        const searchInput = $tw.utils.domMaker('input', {
          class:
            'w-4/5 px-3 py-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-300',
          attributes: {
            placeholder: 'Search photos...',
            type: 'text',
            id: 'search-input',
            name: 'query',
          },
        });

        // const searchBtn = document.createElement('button');
        const searchBtn = $tw.utils.domMaker('button', {
          text: 'Search',
          class:
            'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mx-2 rounded shadow',
          attributes: {
            type: 'submit',
          },
          eventListeners: {
            click: performSearch(),
          },
        });

        // const searchForm = document.createElement('form');
        const searchForm = $tw.utils.domMaker('form', {
          class: 'flex justify-center items-center',
          children: [searchInput, searchBtn],
          eventListeners: {
            submit: performSearch, // 调用performSearch函数
          },
        });
        /* searchForm.classList.add('flex', 'justify-center', 'items-center');
        searchForm.addEventListener('submit', performSearch); */

        /* searchForm.appendChild(searchInput);
        searchForm.appendChild(searchBtn); */

        return { searchForm };
      }

      // 在 Unsplash 上搜索照片
      async function searchPhotos(query) {
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
        const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&client_id=${apiKey}&lang=en&per_page=21`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
      }

      // 创建一个照片元素
      function createPhotoElement(photo) {
        const elementWrapper = document.createElement('div');
        elementWrapper.classList.add('w-full', 'md:w-1/2', 'lg:w-1/3', 'p-4');

        // 在照片元素内部创建一个复制按钮
        const copyBtn = $tw.utils.domMaker('button', {
          class:
            'bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus: shadow-outline transform scale-0 duration-400 transition',
        });
        copyBtn.dataset.photoUrl = `<$image source="${photo.urls.regular}" alt="Unsplash Image" fancybox="yes"/>`;
        copyBtn.textContent = 'Copy';

        // 监听复制图片 URL 的按钮点击事件
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(copyBtn.dataset.photoUrl);
          pushNotify('info', 'Unplash', 'copyed');
        });

        // 在照片元素内部创建一个文本元素，显示图片描述信息
        // const textElement = document.createElement('div');
        const textElement = $tw.utils.domMaker('div', {
          class: 'text-white py-2 px-4 text-sm truncate',
        });
        textElement.textContent = photo.alt_description;

        // const element = document.createElement('div');
        const element = $tw.utils.domMaker('div', {
          class: 'bg-white rounded-lg shadow-lg overflow-hidden w-44 h-44',
          children: [copyBtn],
        });
        element.style.backgroundImage = `url(${photo.urls.small})`;
        element.style.backgroundSize = 'cover';
        element.style.backgroundPosition = 'center';

        // 在鼠标悬停时显示复制按钮
        element.addEventListener('mouseenter', () => {
          copyBtn.classList.remove('scale-0');
          copyBtn.classList.add('scale-100');
        });
        element.addEventListener('mouseleave', () => {
          copyBtn.classList.remove('scale-100');
          copyBtn.classList.add('scale-0');
        });

        elementWrapper.appendChild(element);
        elementWrapper.appendChild(textElement);

        return elementWrapper;
      }

      // 监听提交事件
      async function performSearch(event) {
        console.log('🎉');
        event.preventDefault(); // 阻止表单提交

        resultsContainer.innerHTML = '';
        const query = event.target.elements.query.value.trim();

        if (!query) {
          return;
        }

        try {
          const photos = await searchPhotos(query);

          photos.forEach(photo => {
            const element = createPhotoElement(photo);
            resultsContainer.appendChild(element);
          });
        } catch (error) {
          console.log(error);
        }
      }

      const container = document.createElement('div');
      container.classList.add('flex', 'flex-col');

      // 创建搜索栏和搜索按钮
      const { searchForm } = createSearchBar();
      container.appendChild(searchForm);

      const resultsContainer = document.createElement('div');
      resultsContainer.classList.add(
        'flex',
        'flex-wrap',
        'justify-center',
        'mt-4',
      );
      container.appendChild(resultsContainer);

      // 在页面中显示照片部件
      parent.insertBefore(container, nextSibling);
      /* parent.insertBefore(divNode, nextSibling) 用于在父节点 parent 中插入一个新节点 divNode，并将其插入到指定的 nextSibling 节点之前。这个方法返回被插入的节点 divNode。
而 this.domNodes.push(divNode) 则是将 divNode 添加到当前组件实例的 domNodes 数组中，以便在以后的更新操作中可以方便地访问和操作该节点。
两者的区别在于，parent.insertBefore(divNode, nextSibling) 是 DOM 操作，用于修改页面上的 DOM 结构，而 this.domNodes.push(divNode) 则是组件状态的维护，用于记录当前组件实例所包含的节点信息。 */
    }
  }

  exports['unsplash'] = UnsplashWidget;
})();
