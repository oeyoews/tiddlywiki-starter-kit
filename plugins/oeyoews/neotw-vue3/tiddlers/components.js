/*\
title: $:/plugins/oeyoews/neotw-vue3/components.js
type: application/javascript
module-type: library

\*/

const Vue = require('./vue.global.prod.js');
const { ref } = Vue;
const template = $tw.wiki.getTiddlerText(
  '$:/plugins/oeyoews/neotw-vue3/example.html'
);

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

  template // TIPS: 这里也可以将html 写在外面， 使用selector 来挂载, 从而提升html 的可读性, 但是要注意selector 的重复. 或者可以将api 存在一个单独的tiddler, 如何通过$tw api 读取html 给template 赋值(推荐使用)
};
