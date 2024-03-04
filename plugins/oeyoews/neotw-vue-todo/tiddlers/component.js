/*\
title: $:/plugins/oeyoews/neotw-vue-todo/component.js
type: application/javascript
module-type: library

\*/

const { toRaw, computed, ref } = window.Vue;

// i18n
const VueI18n = require('vue-i18n.global.prod.js');

const todo = (json = 'todo.json') => {
  const component = {
    setup() {
      const newTodo = ref('');
      const btnClass = ref(
        'border-solid border-gray-100 dark:border-gray-400 p-2'
      );

      const { t } = VueI18n.useI18n();

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
        t,
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
          text: this.newTodo.trim(),
          date: new Date().toLocaleString()
          // done: false,
          // editing: false
        });
        this.newTodo = '';
      },

      resetTodos() {
        const confirm = window.confirm(this.t('todo.resetTodos'));
        confirm ? (this.todos = []) : null;
      },

      startEdit(index) {
        const todo = this.todos.value[index];
        if (!Object.prototype.hasOwnProperty.call(todo, 'editing')) {
          todo.editing = true;
        } else {
          todo.editing = true;
        }
      },
      cancelEdit(index) {
        this.todos[index].editing = false;
      },

      updateTodoItem(index) {
        const todo = this.todos[index];
        if (todo.draftText.trim() === '') {
          this.removeTodo(index);
        } else {
          todo[index].text = todo.draftText;
        }
      },

      removeTodo(index) {
        this.todos.splice(index, 1);
      }
    },

    template: $tw.wiki.getTiddlerText(
      '$:/plugins/oeyoews/neotw-vue-todo/todo.vue'
    )
  };
  return component;
};

module.exports = todo;
