/*\
title: $:/plugins/oeyoews/neotw-vue3/components.js
type: application/javascript
module-type: library

\*/

const Vue = require('./vue.global.prod.js');
const { ref } = Vue;

module.exports = {
  setup() {
    let count = ref(0);
    let version = ref(3);

    setTimeout(() => {
      version.value = Vue.version;
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
  template: `<div :id="version">Hello, Vue {{ version }}! time is {{ time }}
  </div>
  <h2>计数器</h2>
	<button @click="count++" class="border border-solid p-2">Count is {{ count }}</button>
  `
};
