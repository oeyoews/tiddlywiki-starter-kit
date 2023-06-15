// TODO: fix mobile style
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
  label.innerText = '';

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
    'bg-red-500 text-white px-4 py-2 rounded-l-none rounded-r-md ml-0 hover:bg-red-600 duration-200 transition';
  button.textContent = 'Clear';

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
    emojiContainer.textContent = ''; // Clear previous results

    var gridContainer = document.createElement('div');
    gridContainer.classList.add(
      'grid',
      'grid-cols-4',
      'gap-4',
      'overflow-y-scroll',
      // 'h-screen',
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
        );
        emoji.textContent = emojis[key];
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
        title: 'Emoji Picker',
        titleText: `${emoji} Copied`,
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
