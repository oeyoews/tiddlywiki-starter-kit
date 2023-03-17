/*\
title: $:/plugins/oeyoews/neotw-hitokoto/hitokoto.js
type: application/javascript

deprecated hitokoto
\*/

function hitokoto_footer(text = '#htext', author = '#hauthor') {
  fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      const hitokoto = document.querySelector(text);
      let data_ = data.hitokoto;
      // if (data_.length > 28) {
      //   data_ = data_.substring(0, 28);
      //   data_ = data_ + '…';
      // }
      hitokoto.innerText = data_;
      const hitokoto_from = document.querySelector(author);
      // hitokoto_from.href = 'https://hitokoto.cn/?uuid=' + data.uuid;
      hitokoto_from.innerText = '@' + data.from;
      // console.log('🚀 Updated hitokoto');
    })
    .catch(console.error);
}

const htext_example = '#htext-example';
const hauthor_example = '#hauthor-example';

hitokoto_footer(htext_example, hauthor_example);
setInterval('hitokoto_footer(htext_example, hauthor_example)', 9000);
