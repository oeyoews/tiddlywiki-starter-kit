/*\
title: $:/plugins/oeyoews/neotw-vue-todo/component.js
type: application/javascript
module-type: library

\*/

const { toRaw, computed, ref } = window.Vue;

const todo = (json = 'todo.json') => {
  const component = {
    setup() {
      const newTodo = ref('');
      const btnClass = ref(
        'border-solid border-gray-100 dark:border-gray-400 p-2'
      );

      const todos = ref(
        $tw.wiki.tiddlerExists(json)
          ? JSON.parse($tw.wiki.getTiddlerData(json))
          : []
      );

      const hideCompleted = ref(false);

      const filteredTodos = computed(() => {
        return hideCompleted.value
          ? todos.value.filter((t) => !t.done)
          : todos.value;
      });

      const undone = computed(() => {
        return todos.value?.filter((t) => !t.done)?.length || 0;
      });

      // 返回值会暴露给模板和其他的选项式 API 钩子
      return {
        undone,
        todos,
        btnClass,
        hideCompleted,
        filteredTodos,
        newTodo
      };
    },

    directives: {
      focus: {
        mounted(el) {
          el.focus();
        }
      }
    },

    watch: {
      todos: {
        handler() {
          const data = toRaw(this.todos);
          $tw.wiki.setTiddlerData(json, JSON.stringify(data));
        },
        deep: true
      }
    },

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
      }
    },

    // 挂载到的 节点
    template: $tw.wiki.getTiddlerText(
      '$:/plugins/oeyoews/neotw-vue-todo/todo.html'
    )
  };
  return component;
};

module.exports = todo;
