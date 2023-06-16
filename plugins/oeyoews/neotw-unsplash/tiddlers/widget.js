/*\
title: $:/plugins/oeyoews/neotw-unsplash/widget.js
type: application/javascript
module-type: widget

neotw-unsplash widget

\*/
(function () {
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

      // 创建搜索栏和搜索按钮
      function createSearchBar() {
        const searchInput = $tw.utils.domMaker('input', {
          class:
            'px-2 py-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-300',
          attributes: {
            autofocus: '',
            placeholder: 'Search photos...',
            type: 'text',
            id: 'search-input',
            name: 'query',
          },
        });

        const searchBtn = $tw.utils.domMaker('button', {
          text: '🔍',
          class:
            'mx-2 rounded-sm w-1/5 duration-400 transition bg-indigo-400 hover:bg-indigo-500',
          attributes: {
            type: 'submit',
          },
        });

        const searchForm = $tw.utils.domMaker('form', {
          class: 'flex justify-center items-center my-4',
          children: [searchInput, searchBtn],
        });
        searchForm.addEventListener('submit', performSearch);

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

        const element = $tw.utils.domMaker('div', {
          class:
            'bg-white rounded-lg shadow-lg overflow-hidden w-44 h-44 cursor-pointer',
        });
        element.style.backgroundImage = `url(${photo.urls.small})`;
        element.style.backgroundSize = 'cover';
        element.style.backgroundPosition = 'center';

        // 监听图片元素的点击事件，复制图片 URL
        element.addEventListener('click', () => {
          const imageUrl = `<$image source="${photo.urls.regular}" alt="Unsplash Image" fancybox="yes"/>`;
          navigator.clipboard.writeText(imageUrl);
          Swal.fire({
            icon: 'success',
            titleText: `Copied to Clipboard`,
            toast: true,
            footer: 'Unsplash by @oeyoews',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: false,
          });
        });

        elementWrapper.appendChild(element);

        return elementWrapper;
      }

      // 监听提交事件
      async function performSearch(event) {
        event.preventDefault();
        resultsContainer.textContent = 'Searching...';
        resultsContainer.classList.add('h-96', 'overflow-y-scroll');
        const query = event.target.elements.query.value.trim();

        if (!query) {
          return;
        }

        try {
          const photos = await searchPhotos(query);
          resultsContainer.textContent = '';

          if (Array.isArray(photos)) {
            photos.forEach(photo => {
              const element = createPhotoElement(photo);
              resultsContainer.appendChild(element);
            });
          }
        } catch (error) {
          console.log(error);
        }
      }

      const { searchForm } = createSearchBar();

      const resultsContainer = $tw.utils.domMaker('div', {
        text: '',
        class: 'flex flex-wrap justify-center mt-4',
      });

      const container = $tw.utils.domMaker('div', {
        class: 'flex flex-col',
        children: [searchForm, resultsContainer],
      });

      parent.insertBefore(container, nextSibling);
    }
  }

  exports['unsplash'] = UnsplashWidget;
})();
