/*\
title: $:/plugins/oeyoews/tiddlywiki-back-top-top/back-to-top.js
type: application/javascript
// module-type: startup

Adds a "back to top" button with a progress indicator to the page which allows users to quickly scroll to the top of the page.

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  // Export name and synchronous status
  exports.name = 'back-to-top';
  exports.platforms = ['browser'];
  exports.after = ['startup'];
  exports.synchronous = true;

  // Define the "back to top" button
  const svgButton = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"></path></svg>`;
  // Define the amount of pixels from the top of the page at which to show the button
  const showButtonAt = 200;

  // Define the function that will be called when the button is clicked
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Create the button element and attach the click listener
  const button = document.createElement('div');
  const backToTopButton = document.createElement('button');
  button.id = 'oeyoews-story-top';
  backToTopButton.setAttribute('title', '返回到顶部');
  backToTopButton.className = 'back-to-top-btn';
  backToTopButton.innerHTML = svgButton;
  button.appendChild(backToTopButton);
  // Add a span element for the progress indicator
  const progressIndicator = document.createElement('span');
  progressIndicator.className = 'back-to-top-progress';
  button.appendChild(progressIndicator);
  backToTopButton.addEventListener('click', scrollToTop);

  // Add the button to the page
  document.body.appendChild(button);

  function backListener() {
    // Add a scroll event listener to show/hide the button based on the user's scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > showButtonAt) {
        backToTopButton.classList.add('is-visible');
        progressIndicator.classList.add('is-visible');
        // Update the progress indicator
        const pageHeight = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min(
          (window.scrollY / pageHeight) * 100,
          99,
        ).toFixed(1);
        progressIndicator.textContent = `${Math.round(progress)}.0%`;
      } else {
        backToTopButton.classList.remove('is-visible');
        progressIndicator.classList.remove('is-visible');
        // progressIndicator.textContent = '';
      }
    });
  }
  exports.startup = backListener;
})();
