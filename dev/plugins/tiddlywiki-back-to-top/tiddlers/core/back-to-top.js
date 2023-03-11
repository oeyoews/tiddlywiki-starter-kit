/*\
title: $:/plugins/my-plugin/back-to-top.js
type: application/javascript
module-type: global

Adds a "back to top" button to the page which allows users to quickly scroll to the top of the page.
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  'use strict';

  if (!$tw.browser) return;

  // Define the "back to top" button
  const buttonHtml = `<button class="back-to-top-btn" style="display: none;">
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"></path></svg>
</button>`;
  // Define the amount of pixels from the top of the page at which to show the button
  const showButtonAt = 200;

  // Define the function that will be called when the button is clicked
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Create the button element and attach the click listener
  const button = document.createElement('div');
  button.id = 'oeyoews-story-top';
  button.innerHTML = buttonHtml;
  button.firstElementChild.addEventListener('click', scrollToTop);

  // Add the button to the page
  document.body.appendChild(button);

  // Add a scroll event listener to show/hide the button based on the user's scroll position
  window.addEventListener('scroll', () => {
    // const buttonElem = button.firstElementChild;
    // if (window.scrollY > showButtonAt) {
    //   buttonElem.classList.remove('is-visible');
    //   console.log(buttonElem);
    // } else {
    //   buttonElem.classList.add('is-visible');
    // }
    button.firstElementChild.style.display =
      window.scrollY > showButtonAt ? 'block' : 'none';
  });
})();
