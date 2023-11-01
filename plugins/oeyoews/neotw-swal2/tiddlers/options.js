/*\
title: $:/plugins/oeyoews/neotw-swal2/options.js
type: application/javascript
module-type: library

\*/
module.exports = {
  title: 'Welcome',
  text: '',
  icon: 'success',
  timer: 3000, // 3 seconds
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
  toast: true,
  position: 'top-end',
  showCancelButton: false,
  showConfirmButton: false,
  confirmButtonText: 'Silent',
  cancelButtonText: 'Close',
};
