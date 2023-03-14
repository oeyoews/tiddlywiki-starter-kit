/**
 * init_fbox
 */

function init_fbox() {
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    // comment below will have two a tag
    // conflict for image.js(overwrite)
    // var parent = image.parentElement;
    // var hasFancybox = parent.hasAttribute('data-fancybox');
    // if (hasFancybox) return;
    var link = document.createElement('a');
    link.href = image.src;
    link.setAttribute('data-fancybox', '');
    link.setAttribute('data-caption', image.alt);
    image.parentNode.insertBefore(link, image);
    link.appendChild(image);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init_fbox();
});
