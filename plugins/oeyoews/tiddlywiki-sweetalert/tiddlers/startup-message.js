/*\
title: $:/plugins/oeyoews/tiddlywiki-sweetalert/startup-message.js
type: application/javascript
module-type: library

swealalert startup message

\*/

const swal = require('$:/plugins/oeyoews/sweetalert/sweetalert.min.js');
const neotw = JSON.parse(localStorage.getItem('neotw')) || {};
const currentDate = new Date().toDateString();
const noNotifyDate = neotw.noNotifyDate;

/* // online tip
if (window.location.protocol === 'https:' && noNotifyDate !== currentDate) {
  swal({
    title: '👋 Welcome to neotw !',
    text: '',
    icon: 'success',
    buttons: {
      no: {
        text: 'Silent',
        value: false,
      },
      yes: {
        text: 'Close',
        value: true,
        visible: true,
      },
    },
  }).then(result => {
    if (!result) {
      neotw.noNotifyDate = currentDate;
      localStorage.setItem('neotw', JSON.stringify(neotw));
    }
  });
} */

axios
  .get('https://raw.githubusercontent.com/oeyoews/neotw/main/package.json')
  .then(function (response) {
    const version = response.data.version;

    if (window.location.protocol === 'https:' && noNotifyDate !== currentDate) {
      swal({
        title: 'Welcom to Neotw 👋',
        text: 'The version of neotw is ' + version,
        icon: 'success',
        buttons: {
          no: {
            text: 'Silent',
            value: false,
          },
          yes: {
            text: 'Close',
            value: true,
            visible: true,
          },
        },
      }).then(result => {
        if (!result) {
          neotw.noNotifyDate = currentDate;
          localStorage.setItem('neotw', JSON.stringify(neotw));
        }
      });
    }
  })
  .catch(function (error) {
    swal({
      title: 'Error',
      text: 'Failed to fetch version: ' + error.message,
      icon: 'error',
    });
  });
