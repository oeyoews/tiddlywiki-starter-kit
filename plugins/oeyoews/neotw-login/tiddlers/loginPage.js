/*\
title: $:/plugins/oeyoews/neotw-login/loginPage.js
type: application/javascript
module-type: library

loginPage
\*/

module.exports = function loginPage() {
  const loginForm = document.getElementById('om-login-form');
  const password = document.getElementById('om-password');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(password.value);
  });
};
