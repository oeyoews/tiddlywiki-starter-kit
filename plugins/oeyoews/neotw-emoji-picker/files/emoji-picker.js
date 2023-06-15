function emojiComponent() {
  var form = document.createElement('form');
  form.className = 'mb-4';
  form.onsubmit = function (event) {
    event.preventDefault();
  };

  // Create label element
  var label = document.createElement('label');
  label.htmlFor = 'emoji-input';
  label.className = 'text-lg mb-2 block';
  label.innerText = 'Enter an emoji:';

  // Create input element
  var input = document.createElement('input');
  input.type = 'text';
  input.id = 'emoji-input';
  input.oninput = function (event) {
    debouncedSearchEmoji(event);
  };
  input.className =
    'border border-gray-300 px-2 py-2 rounded-r-none rounded-l-md focus:outline-none flex-1';

  // Create button element
  var button = document.createElement('button');
  button.type = 'button';
  button.onclick = clearSearch;
  button.className =
    'bg-blue-500 text-white px-4 py-2 rounded-l-none rounded-r-md ml-0';
  button.textContent = 'Search';

  // Append label, input, and button to form
  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(button);

  // Create emoji container
  var emojiContainer = document.createElement('div');
  emojiContainer.id = 'emoji-container';
  emojiContainer.className = '';

  // Create main container
  var container = document.createElement('div');
  container.className = 'max-w-md w-full bg-white p-6 rounded-lg';
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
    emojiContainer.textContent = '';

    for (var key in emojis) {
      if (emojis.hasOwnProperty(key) && key.indexOf(input) !== -1) {
        var emoji = document.createElement('span');
        emoji.classList.add(
          'cursor-pointer',
          'm-2',
          'bg-slate-100',
          'rounded',
          'p-4',
          'hover:bg-slate-200',
          'transition',
          'duration-200',
        );
        emoji.innerHTML = emojis[key];
        emojiContainer.appendChild(emoji);
        // document.getElementById('copy-button').classList.remove('hidden');

        // 添加点击事件处理程序
        emoji.addEventListener('click', function () {
          copyEmojiToClipboard(this.innerHTML);
        });
      }
    }
  }

  async function copyEmojiToClipboard(emoji) {
    try {
      await navigator.clipboard.writeText(emoji);
      Swal.fire({
        icon: 'success',
        title: 'Emoji Picker',
        titleText: 'Copied',
        toast: true,
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
    document.getElementById('emoji-container').innerHTML = '';
  }

  return virtualRoot;
}

module.exports = {
  emojiComponent,
};
