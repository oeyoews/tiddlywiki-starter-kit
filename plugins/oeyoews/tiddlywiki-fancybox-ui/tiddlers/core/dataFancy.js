/*\
title: addDataFancy.js
type: application/javascript
module-type: library

addDataFancy
\*/
function addDataFancy() {
  const imgs = document.querySelectorAll('img');

  imgs.forEach((img, index) => {
    if (!img.hasAttribute('data-fancybox')) {
      img.setAttribute('data-fancybox', index.toString());
      img.classList.add('cursor-pointer');
    }
  });
}

exports.addDataFancy = addDataFancy;
