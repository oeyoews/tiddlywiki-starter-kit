function emojiComponent() {
  var form = document.createElement('form');
  form.className = 'flex justify-center items-center mb-4';
  form.onsubmit = function (event) {
    event.preventDefault();
  };

  // Create label element
  var label = document.createElement('label');
  label.htmlFor = 'emoji-input';
  label.innerText = '';

  // Create input element
  var input = document.createElement('input');
  input.type = 'text';
  input.id = 'emoji-input';
  input.oninput = function (event) {
    debouncedSearchEmoji(event);
  };
  input.className =
    'px-4 py-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-300 w-4/5';
  input.placeholder = '🍉 Search emoji ...';

  // Create button element
  var button = document.createElement('button');
  button.type = 'button';
  button.onclick = clearSearch;
  button.className =
    'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mx-2 rounded shadow w-auto';
  button.textContent = '🍃 Clear';
  button.title = 'Clear';

  // Append label, input, and button to form
  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(button);

  // Create emoji container
  var emojiContainer = document.createElement('div');
  emojiContainer.id = 'emoji-container';

  // Create main container
  var container = document.createElement('div');
  container.className = 'max-w-md w-full bg-white p-4 rounded-lg';
  container.appendChild(form);
  container.appendChild(emojiContainer);
  const virtualRoot = document.createElement('div');
  virtualRoot.className = 'flex items-center justify-center m-2 rounded p-2';
  virtualRoot.appendChild(container);

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
    var emojiContainer = document.getElementById('emoji-container');
    emojiContainer.innerHTML = ''; // Clear previous results

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
        var emoji = document.createElement('span');
        emoji.classList.add(
          'cursor-pointer',
          'py-4',
          'bg-gray-100',
          'rounded',
          'hover:bg-gray-200',
          'transition',
          'duration-200',
          'flex',
          'justify-center',
          'items-center',
          'h-16',
          'w-16',
          'text-4xl',
        );
        emoji.innerHTML = emojis[key];
        emoji.title = key;
        gridContainer.appendChild(emoji);

        // 添加点击事件处理程序
        emoji.addEventListener('click', function () {
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
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }

  function debouncedSearchEmoji(event) {
    debounce(function () {
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

module.exports = {
  emojiComponent,
};
