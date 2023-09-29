/*\
title: $:/plugins/oeyoews/neotw-deepl/deepl.js
type: application/javascript
module-type: library

neotw-deepl library

\*/
function deepl() {
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

  // 翻译函数
  function translateText() {
    const inputText = document.getElementById('input').value;
    const outputText = document.getElementById('output');
    const languageSelect = document.getElementById('languageSelect');
    const targetLang = languageSelect.value;

    const params = new URLSearchParams();
    let DEEPL_API_KEY = localStorage.getItem('DEEPL_API_KEY');

    if (!DEEPL_API_KEY) {
      DEEPL_API_KEY = window.prompt('Please enter your API key:');
      localStorage.setItem('DEEPL_API_KEY', DEEPL_API_KEY);
    }
    const apiUrl = 'https://api-free.deepl.com/v2/translate';

    params.append('auth_key', DEEPL_API_KEY);
    params.append('text', inputText);
    params.append('target_lang', targetLang);

    fetch(apiUrl, {
      method: 'POST',
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.message) {
          outputText.value = data.translations[0].text;
        } else {
          // TODO
          // alert(data.message);
        }
      });
  }

  const debouncedTranslate = debounce(translateText, 200);

  // 监听输入框和语言选择框的变化
  document
    .getElementById('input')
    .addEventListener('input', debouncedTranslate);

  document
    .getElementById('languageSelect')
    .addEventListener('change', debouncedTranslate);

  // 复制按钮点击事件
  document.getElementById('copyButton').addEventListener('click', function () {
    const outputText = document.getElementById('output').value;
    navigator.clipboard
      .writeText(outputText)
      .then(() => {
        Swal.fire({
          toast: true,
          icon: 'success',
          position: 'top-end',
          timer: 1500,
          title: '复制成功',
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}

module.exports = deepl;
