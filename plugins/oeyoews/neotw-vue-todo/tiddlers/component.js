/*\
title: $:/plugins/oeyoews/neotw-vue-todo/component.js
type: application/javascript
module-type: library

\*/

const { toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

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
        $tw.wiki.tiddlerExists(json) ? $tw.wiki.getTiddlerData(json) : []
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

      const done = computed(() => {
        return todos.value?.filter((t) => t.done)?.length || 0;
      });

      const progress = computed(
        () => (done.value / todos.value.length).toFixed(2) * 100 + '%'
      );

      return {
        progress,
        t,
        done,
        undone,
        todos,
        btnClass,
        hideCompleted,
        filteredTodos,
        newTodo
      };
    },

    mounted() {
      if (!$tw.wiki.tiddlerExists(json)) {
        $tw.wiki.setText(json, 'type', null, 'application/json', {
          suppressTimestamp: true
        });

        $tw.wiki.setText(json, 'text', null, '[]', {
          suppressTimestamp: true
        });
      }
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
          $tw.wiki.setText(json, 'text', null, JSON.stringify(data), {
            suppressTimestamp: true
          });
        },
        deep: true
      }
    },

    methods: {
      notify() {
        toast(this.t('todo.notify'), {
          theme: 'auto',
          type: 'success',
          transition: 'slide',
          position: 'top-left',
          hideProgressBar: true,
          dangerouslyHTMLString: true
        });
      },

      toggleLang() {
        localStorage.setItem('lang', this.$i18n.locale);
      },

      addTodo() {
        this.todos.unshift({
          id: this.todos.length,
          text: this.newTodo,
          date: new Date().toLocaleString()
          // done: false,
          // editing: false
        });
        this.newTodo = '';
        this.notify();
      },

      async resetTodos() {
        const confirm = window.confirm(this.t('todo.resetTodos'));
        confirm ? (this.todos = []) : null;
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
