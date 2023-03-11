function main() {
  window.location.href = './main.html';
}

// this is a github blocks test comments
function hitokoto_footer() {
  fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      const hitokoto = document.querySelector('#hitokoto_text');
      hitokoto.innerText = data.hitokoto;
      const hitokoto_from = document.querySelector('#hitokoto_from');
      hitokoto_from.href = 'https://hitokoto.cn/?uuid=' + data.uuid;
      hitokoto_from.innerText = '@' + data.from;
    })
    .catch(console.error);
}

// hitokoto_footer();

// hitokoto_footer();
// mobile move
// document.addEventListener('touchend', e => {
//   window.location.href = './main.html';
// });

// Key Events
document.addEventListener('keypress', e => {
  if (e.keyCode === 13 || e.keyCode === 32) {
    window.location.href = './main.html';
  }
});
