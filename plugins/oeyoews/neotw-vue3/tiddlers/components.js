/*\
title: $:/plugins/oeyoews/neotw-vue3/components.js
type: application/javascript
module-type: library

\*/

if (!window.Vue) {
  window.Vue = require('./vue.global.prod.js');
}

const { ref } = window.Vue;

module.exports = {
  // components usage
  // props: {
  //   msg: String
  // },
  setup() {
    // TIPS: ref 用来声明基本数据类型，reactive用来声明引用数据类型
    let count = ref(0);
    let version = ref(3);
    let sidebarText = ref('开启');

    // 这里的this 指向 Window, 因为setup 函数还没有执行created 声明周期方法, 所以无法使用data, methods, 如果希望访问到当前vue 示例， 可以使用vue 的内置 getCurrentInstance 方法
    // console.log(this);
    let time = ref(new Date().toLocaleTimeString());

    // TIPS: 不要忘记使用.value
    // NOTE: 定时器暂时无法借助vue 的 beforeUnmount 清除
    // setTimeout(() => {
    //   version.value = Vue.version;
    // }, 1000);

    // setInterval(() => {
    //   time.value = new Date().toLocaleTimeString();
    //   console.log(time.value);
    // }, 1000);

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count,
      version,
      time,
      sidebarText
    };
  },

  /** methods 是一些用来更改状态与触发更新的函数 它们可以在模板中作为事件处理器绑定*/
  methods: {
    toggleSidebar() {
      const statusTiddler = '$:/state/notebook-sidebar';
      const status = $tw.wiki.getTiddlerText(statusTiddler);
      const nextStatus = status === 'yes' ? 'no' : 'yes';
      $tw.wiki.setText(statusTiddler, 'text', null, nextStatus);

      // TIPS: 使用this 注意箭头函数的影响
      // methods 里面使用 ref 值不用加value, 会自动解包
      if (status === 'yes') {
        this.sidebarText = '关闭';
      } else {
        this.sidebarText = '开启';
      }
    }
    // $tw() {
    //   return window.$tw;
    // }
  },

  /** data() 返回的属性将会成为响应式的状态 并且暴露在 `this` 上 */
  // data() {
  //   return {};
  // },

  // JSX
  // render(h) { },

  /**
   * @description: 一些生命周期函数
   * @see: https://cn.vuejs.org/api/options-lifecycle.html
   */
  beforeCreate() {
    // console.log('beforeCreate');
  },
  created() {
    // console.log('created');
  },
  mounted() {
    // console.log(this.sidebarText);
  },
  // TODO: vue 是如何判断unmounted?
  // beforeUnmount() { console.log('unmounted'); },
  errorCaptured: (err, vm, info) => {},
  renderTracked({ key, target, type }) {},

  // 挂载到的 节点
  template: $tw.wiki.getTiddlerText(
    '$:/plugins/oeyoews/neotw-vue3/example.html'
  )
};
