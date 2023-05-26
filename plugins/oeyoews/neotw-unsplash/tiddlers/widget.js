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
            autofocus: '',
            placeholder: 'Search photos...',
            type: 'text',
            id: 'search-input',
            name: 'query',
          },
        });

        // 在这个代码中，虽然没有显式地声明 searchBtn 是一个提交按钮，但是由于它是被包含在一个表单元素中的，所以它默认就是一个提交按钮。当用户点击 searchBtn 按钮时，该按钮会触发表单的提交事件，从而调用 performSearch 函数来执行搜索操作。
        //         事件委托是一种常见的优化技巧，它利用事件冒泡机制来减少事件处理程序的数量，从而提高性能和代码的可维护性。具体来说，事件委托的原理是将事件处理程序绑定到父元素上，然后通过事件冒泡机制来捕获子元素上的事件，从而达到统一处理的效果。
        // 例如，在一个列表中，如果需要为列表项绑定点击事件，可以选择为每个列表项单独绑定事件处理程序，也可以将事件处理程序绑定到列表的父元素上，然后在处理程序中判断事件源是否为列表项，如果是，则执行相应的操作。这样做的好处是，可以避免为每个列表项单独绑定事件处理程序，从而减少代码量和内存占用，同时也可以避免由于动态添加或删除列表项而导致事件处理程序失效的问题。
        // 事件委托的应用场景很多，例如对于动态生成的元素、列表、表格等，都可以使用事件委托来处理事件，以提高代码的效率和可维护性。
        // 在这个代码中，由于使用了事件委托的方式来监听表单的提交事件，所以存在事件冒泡。具体来说，当用户点击搜索按钮时，会触发按钮的点击事件，然后该事件会向上冒泡到表单元素，最终触发表单的提交事件。在 performSearch 函数中，可以通过调用 event.preventDefault() 方法来阻止事件的默认行为，从而避免表单的自动提交。
        const searchBtn = $tw.utils.domMaker('button', {
          text: 'Search',
          class:
            'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mx-2 rounded shadow',
          attributes: {
            type: 'submit',
          },
        });

        // const searchForm = document.createElement('form');
        const searchForm = $tw.utils.domMaker('form', {
          class: 'flex justify-center items-center',
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
        // 阻止表单提交
        event.preventDefault();
        resultsContainer.textContent = '';
        const query = event.target.elements.query.value.trim();

        if (!query) {
          return;
        }

        try {
          const photos = await searchPhotos(query);

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

      // 创建搜索栏和搜索按钮
      const { searchForm } = createSearchBar();

      const resultsContainer = $tw.utils.domMaker('div', {
        text: '',
        class: 'flex flex-wrap justify-center mt-4',
      });

      const container = $tw.utils.domMaker('div', {
        class: 'flex flex-col',
        children: [searchForm, resultsContainer],
      });

      // 在页面中显示照片部件
      parent.insertBefore(container, nextSibling);
      /* parent.insertBefore(divNode, nextSibling) 用于在父节点 parent 中插入一个新节点 divNode，并将其插入到指定的 nextSibling 节点之前。这个方法返回被插入的节点 divNode。
而 this.domNodes.push(divNode) 则是将 divNode 添加到当前组件实例的 domNodes 数组中，以便在以后的更新操作中可以方便地访问和操作该节点。
两者的区别在于，parent.insertBefore(divNode, nextSibling) 是 DOM 操作，用于修改页面上的 DOM 结构，而 this.domNodes.push(divNode) 则是组件状态的维护，用于记录当前组件实例所包含的节点信息。 */
    }
  }

  exports['unsplash'] = UnsplashWidget;
})();
