/*\
title: $:/plugins/oeyoews/neotw-vue3/components.js
type: application/javascript
module-type: library

\*/

const Vue = require('./vue.global.prod.js');
const { ref } = Vue;

module.exports = {
  setup() {
    let count = ref(3);
    setTimeout(() => {
      count.value++;
    }, 2000);
    return { count };
  },
  template: `<div>Hello, Vue{{ count }}!</div>`
};
