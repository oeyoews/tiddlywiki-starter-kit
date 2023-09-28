// TODO: fix popup position
// navigator.clipboard.writeText no need permissions ???
function emojiComponent() {
  const createElement = $tw.utils.domMaker

  // Create label element
  const label = createElement('label', {
    text: ''
  });
  label.htmlFor = 'emoji-input';

  // Create input element
  var input = createElement('input', {
    class: 'px-4 py-2 border-none rounded shadow-sm focus:outline-none w-4/5',
    attributes: {
      type: 'text',
      id: 'emoji-input'
    }
  });
  input.oninput = function(event) {
    debouncedSearchEmoji(event);
  };

  const placeholder = $tw.wiki.getTiddlerText(
    '$:/language/emoji-picker/placeholder',
  );
  input.placeholder = placeholder;

  const button = createElement('button', {
    text: '🍃',
    class: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mx-2 rounded shadow w-auto cursor-pointer',
    attributes: {
      type: 'button',
      title: 'Clear'
    }
  });
  button.onclick = clearSearch;

  const form = createElement('form', {
    class: 'flex justify-center items-center mb-4',
    children: [label, input, button]
  })

  form.onsubmit = function(event) {
    event.preventDefault();
  };

  // Create emoji container
  const emojiContainer = createElement('div', {
    attributes: {
      id: 'emoji-container'
    }
  });

  // Create main container
  const container = createElement('div', {
    class: 'max-w-md w-full p-4 rounded-lg',
    children: [form, emojiContainer]
  });

  const virtualRoot = createElement('div', {
    class: 'flex items-center justify-center rounded p-2',
    children: [container]
  });

  const emojis = $tw.wiki.getTiddlerData(
    '$:/plugins/oeyoews/neotw-emoji-picker/emojis.json',
  );

  var debounceTimeout;

  function debounce(func, delay) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(func, delay);
  }

  function searchEmoji(event) {
    var input = event.target.value.trim().toLowerCase();
    const emojiContainer = document.getElementById('emoji-container', {
    });
    emojiContainer.innerHTML = ''

    // add tips node
    var gridContainer = document.createElement('div');
    gridContainer.classList.add(
      'grid',
      'grid-cols-5',
      'gap-4',
      'overflow-y-scroll',
      'h-48',
    );

    for (var key in emojis) {
      if (emojis.hasOwnProperty(key) && key.indexOf(input) !== -1) {
        const emoji = createElement('span', {
          class: 'cursor-pointer py-4 rounded transition duration-200 flex justify-center items-center h-16 w-16 text-4xl',
          attributes: {
            title: key
          }
        });
        emoji.innerHTML = emojis[key];

        gridContainer.appendChild(emoji);

        // 添加点击事件处理程序
        emoji.addEventListener('click', function() {
          copyEmojiToClipboard(this.innerHTML);
        });
      }
    }

    emojiContainer.appendChild(gridContainer);
  }

  async function copyEmojiToClipboard(emoji) {
    try {
      await navigator.clipboard.writeText(emoji);
      Swal.fire({
        icon: 'success',
        // title: 'Emoji Picker',
        titleText: `${emoji} Copied Clipboard`,
        toast: true,
        footer: 'Emoji Picker by @oeyoews',
        position: 'top-end', // top center bottom; start end
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
      });
      /* $tw.rootWidget.dispatchEvent({
        type: 'tm-edit-text-operation',
        param: 'focsu-editor',
        paramObject: {
          text: '👍',
        },
      }); */
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }

  function debouncedSearchEmoji(event) {
    debounce(function() {
      searchEmoji(event);
    }, 300);
  }

  function clearSearch() {
    document.getElementById('emoji-input').value = '';
    document.getElementById('emoji-container').textContent = '';
    Swal.fire({
      icon: 'info',
      // title: 'Emoji Picker',
      titleText: 'Emoji Picker Cleared',
      footer: 'Emoji Picker by @oeyoews',
      toast: true,
      position: 'top-end', // top center bottom; start end
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: false,
    });
  }

  return virtualRoot;
}

module.exports = emojiComponent;
