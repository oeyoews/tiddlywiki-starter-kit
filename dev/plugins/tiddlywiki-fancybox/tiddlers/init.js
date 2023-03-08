let fbox_initialized = false;
function init_fbox() {
  const lables = document.querySelectorAll('img');

  lables.forEach((lable, index) => {
    var parent = lable.parentElement;
    var hasFancybox = parent.hasAttribute('data-fancybox');
    if (!hasFancybox) {
      id = index;
      const elem = document.createElement('a');
      elem.href = lable.getAttribute('src');
      elem.setAttribute('data-fancybox', '');
      lable.parentNode.replaceChild(elem, lable);
      elem.appendChild(lable);
    }
  });
  fbox_initialized = true;
  console.log('初始化fancybox');
}

// WIP dblclick is not suitable
if (!fbox_initialized) {
  document.addEventListener('dblclick', () => {
    // listen to any DOM change and automatically perform spacing via MutationObserver()
    init_fbox();
  });
}

// const lables = document.querySelectorAll('img');
// const elem = document.createElement('a');
// lables.forEach((lable, index) => {
//   const elem = document.createElement('a');
//   elem.href = lable.getAttribute('src');
//   elem.setAttribute('data-fancybox', 'gallary');
//   lable.parentNode.replaceChild(elem, lable);
//   elem.appendChild(lable);
// });
