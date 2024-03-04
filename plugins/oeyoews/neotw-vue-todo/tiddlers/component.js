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
          ? todos.value.filter((t) => !t.done) // .reverse()
          : todos.value; // cannot reverse method, use toraw is also
      });

      const undone = computed(() => {
        return todos.value?.filter((t) => !t.done)?.length || 0;
      });

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

    // mounted() {},

    // computed: {
    //   resetTodo: {
    //     get() {},
    //     set() {}
    //   }
    // },

    methods: {
      toggleLang() {
        localStorage.setItem('lang', this.$i18n.locale);
      },
      addTodo() {
        this.todos.push({
          id: this.todos.length,
          text: this.newTodo,
          date: new Date().toLocaleString(),
          done: false
        });
        this.newTodo = '';
      },

      resetTodos() {
        const confirm = window.confirm('remove todos');
        confirm ? (this.todos = []) : null;
      },
      removeTodo(todo) {
        this.todos = this.todos.filter((t) => t !== todo);
      }
    },

    template: $tw.wiki.getTiddlerText(
      '$:/plugins/oeyoews/neotw-vue-todo/todo.vue'
    )
  };
  return component;
};

module.exports = todo;
