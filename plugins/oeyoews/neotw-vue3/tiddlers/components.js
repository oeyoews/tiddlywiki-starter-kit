/*\
title: $:/plugins/oeyoews/neotw-vue3/components.js
type: application/javascript
module-type: library

\*/

const Vue = require('./vue.global.prod.js');
const { ref } = Vue;

module.exports = {
  // components usage
  // props: {
  //   msg: String
  // },
  setup() {
    let count = ref(0);
    let version = ref(3);

    setTimeout(() => {
      version.value = Vue.version;
    }, 1000);

    let time = ref(new Date().toLocaleTimeString());

    setInterval(() => {
      time.value = new Date().toLocaleTimeString();
      console.log(time.value);
    }, 1000);

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count,
      version,
      time
    };
  },
  methods: {
    log: () => {
      console.log('time');
    }
    // $tw() {
    //   return window.$tw;
    // }
  },
  // data() { },
  // render(h) { },

  // optional apis
  // @see-also: https://cn.vuejs.org/api/options-lifecycle.html
  beforeCreate() {
    // console.log('beforeCreate');
  },
  created() {
    // console.log('created');
  },
  mounted() {
    // console.log('mounted');
  },
  // TODO: vue 是如何判断unmounted?
  beforeUnmount() {
    console.log('unmounted');
  },
  errorCaptured: (err, vm, info) => {},
  renderTracked({ key, target, type }) {},

  template: `<div :id="version">Hello, Vue {{ version }}! time is {{ time }}
  </div>
  <h2>计数器</h2>
  {{ $tw }}
  <button @click="() => console.log($tw())"> log
  </button>
	<button @click="count++" class="border border-solid p-2">Count is {{ count }}</button>
  `
};
