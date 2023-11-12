/*\
title: $:/plugins/oeyoews/neotw-swal2/startup-message-swal.js
type: application/javascript
module-type: library

sweetalert2 startup message
\*/

const neotw = JSON.parse(localStorage.getItem('neotw')) || {};
const currentDate = new Date().toDateString();
const noNotifyDate = neotw.noNotifyDate;
const axios = require('axios.min.js');

axios
  .get(
    'https://raw.githubusercontent.com/oeyoews/tiddlywiki-starter-kit/main/package.json',
  )
  .then(function (response) {
    if (!response) {
      return;
    }
    const version = response.data.version;

    if (window.location.protocol === 'https:' && noNotifyDate !== currentDate) {
      Swal.fire({
        title: 'Welcome to Neotw 👋',
        text: 'The version of neotw is ' + version,
        icon: 'success',
        timer: 3000, // 3 seconds
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
        toast: true,
        position: 'top-end',
        showCancelButton: true,
        confirmButtonText: 'Silent',
        cancelButtonText: 'Close',
      }).then((result) => {
        if (!result.dismiss) {
          neotw.noNotifyDate = currentDate;
          localStorage.setItem('neotw', JSON.stringify(neotw));
        }
      });
    }
  })
  .catch(function (error) {
    Swal.fire({
      title: 'Error',
      text: 'Failed to fetch version: ' + error.message,
      icon: 'error',
    });
  });
