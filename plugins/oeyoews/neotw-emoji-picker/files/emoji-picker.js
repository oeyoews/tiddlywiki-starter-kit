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
  emojiContainer.className = 'mt-4 text-5xl flex items-center';

  // Create copy button
  var copyButton = document.createElement('button');
  copyButton.id = 'copy-button';
  copyButton.onclick = copyEmoji;
  copyButton.className =
    'ml-4 bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500 hidden';
  copyButton.innerText = 'Copy';

  // Create main container
  var container = document.createElement('div');
  container.className = 'max-w-md w-full bg-white p-6 rounded-lg';
  container.appendChild(form);
  container.appendChild(emojiContainer);
  container.appendChild(copyButton);
  const virtualRoot = document.createElement('div');
  virtualRoot.className = 'flex items-center justify-center m-2 rounded p-2';
  virtualRoot.appendChild(container);

  // Append main container to root element
  /* var root = document.getElementById('root');
  root.appendChild(virtualRoot); */

  var emojis = {
    tada: '🎉',
    smile: '😊',
    smiles: '😼',
    heart: '❤️',
    // Add more emojis here
  };

  var debounceTimeout;

  function debounce(func, delay) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(func, delay);
  }

  function searchEmoji(event) {
    var input = event.target.value.trim().toLowerCase();
    var emojiContainer = document.getElementById('emoji-container');
    emojiContainer.innerHTML = '';

    if (input === '') {
      document.getElementById('copy-button').classList.add('hidden');
      return;
    }

    for (var key in emojis) {
      if (emojis.hasOwnProperty(key) && key.indexOf(input) !== -1) {
        var emoji = document.createElement('span');
        emoji.innerHTML = emojis[key];
        emojiContainer.appendChild(emoji);
        document.getElementById('copy-button').classList.remove('hidden');
      }
    }

    if (emojiContainer.innerHTML === '') {
      document.getElementById('copy-button').classList.add('hidden');
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
    document.getElementById('copy-button').classList.add('hidden');
  }

  async function copyEmoji() {
    var emojiContainer = document.getElementById('emoji-container');
    if (emojiContainer.innerText !== '') {
      var emoji = emojiContainer.innerText;
      try {
        await navigator.clipboard.writeText(emoji);
        // alert('Copied!');
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  }

  return virtualRoot;
}

module.exports = {
  emojiComponent,
};
