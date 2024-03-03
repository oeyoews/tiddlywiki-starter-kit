/*\
title: $:/plugins/oeyoews/neotw-vue3/components.js
type: application/javascript
module-type: library

\*/

const { toRaw, computed, ref, reactive } = window.Vue;

module.exports = {
  // components usage
  // props: {
  //   msg: String
  // },
  setup() {
    // TIPS: ref 用来声明基本数据类型，reactive用来声明复杂数据类型, 比如对象，数组一般用ref
    const count = ref(0);
    const version = ref(3);
    const renderComponent = ref(false);
    const sidebarText = ref('开启');
    const inputValue = ref('');
    const newTodo = ref('');
    const selected = ref('A');
    const btnClass = ref(
      'border-solid border-gray-100 dark:border-gray-400 p-2'
    );
    const todos = ref([
      {
        id: 0,
        text: 'HTML'
      }
    ]);

    // 这里的this 指向 Window, 因为setup 函数还没有执行created 声明周期方法, 所以无法使用data, methods, 如果希望访问到当前vue 示例， 可以使用vue 的内置 getCurrentInstance 方法
    // console.log(this);
    let time = ref(new Date().toLocaleTimeString());

    // TIPS: 不要忘记使用.value
    // NOTE: 定时器暂时无法借助vue 的 unmounted 清除
    // setTimeout(() => {
    //   version.value = Vue.version;
    // }, 1000);

    // setInterval(() => {
    //   time.value = new Date().toLocaleTimeString();
    //   console.log(time.value);
    // }, 1000);

    const hideCompleted = ref(false);
    const filteredTodos = computed(() => {
      return hideCompleted.value
        ? todos.value.filter((t) => !t.done)
        : todos.value;
    });

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count,
      version,
      selected,
      time,
      renderComponent,
      sidebarText,
      inputValue,
      todos,
      btnClass,
      hideCompleted,
      filteredTodos,
      newTodo
    };
  },

  watch: {
    // 监听todo变化
    todos: {
      handler() {
        // console.log(toRaw(this.todos));
      },
      deep: true // 深度监听
    }
  },

  // directives: {
  //   focus: {
  //     mounted(el) {
  //       el.focus();
  //     }
  //   }
  // },
  /**
   * methods 是一些用来更改状态与触发更新的函数 它们可以在模板中作为事件处理器绑定
   * Vue 自动为 methods 中的方法绑定了永远指向组件实例的 this
   * */
  methods: {
    addTodo() {
      this.todos.push({
        id: this.todos.length,
        text: this.newTodo,
        done: false
      });
      this.newTodo = '';
    },

    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo);
    },

    toggleRender() {
      this.renderComponent = !this.renderComponent;
    },

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
  },

  /**
   * data() 返回的属性将会成为响应式的状态 并且暴露在 `this` 上
   * data 是vue2 的写法， 但vue3 也兼容这种老式写法, 建议使用setup
   */
  // data() {
  //   return {};
  // },

  /** template 的另外一种替代写法 jsx */
  // render(h) { },

  /**
   * @description: 一些生命周期函数, tiddlywiki 插件开发者基本用不到
   * @see: https://cn.vuejs.org/api/options-lifecycle.html
   */
  beforeCreate() {
    // console.log('beforeCreate');
  },
  created() {
    // console.log('created');
  },
  mounted() {
    this.$refs.pElementRef.textContent = '挂载上了';
  },
  // NOTE: unmount 只有在页面切换， 组件被销毁时才起作用, 所以vue仍然不能解决 tiddlywiki 的 destory 问题
  // beforeUnmount() { console.log('unmounted'); },
  unmounted() {
    console.log('unmounted');
  },
  errorCaptured: (err, vm, info) => {},
  // prod 模式下不可用
  // only work for keepalive
  deactivated() {},
  renderTracked({ key, target, type }) {},

  // TODO: 如果同时出现多个相同的widget, UI 似乎更新当前vue 实例. 因为每个widget 都是一个单独的widget. 所以即使数据发生了变化， 也不会跨实例更新ui, 这不同于一个vue 实例的多个相同组件更新。
  // 挂载到的节点
  template: $tw.wiki.getTiddlerText(
    '$:/plugins/oeyoews/neotw-vue3/example.html'
  )
};
