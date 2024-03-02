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
    version = Vue.version;

    setTimeout(() => {
      count.value = version;
    }, 1000);
    let time = ref(new Date().toLocaleTimeString());
    setInterval(() => {
      time.value = new Date().toLocaleTimeString();
    }, 1000);
    return {
      count,
      version,
      time
    };
  },
  // TODO: 会有闪烁
  template: `<div :id="version">Hello, Vue {{ count }}! time is {{ time }} </div>`
};
