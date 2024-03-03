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

      // const searchValue = ref('');
      // const onSearch = (val) => vant.showToast(val);
      // const onClickButton = () => vant.showToast(searchValue.value);

      const todos = ref(
        $tw.wiki.tiddlerExists(json)
          ? JSON.parse($tw.wiki.getTiddlerData(json))
          : []
      );

      const show = ref(false);
      const showNotify = () => {
        show.value = true;
        setTimeout(() => {
          show.value = false;
        }, 2000);
      };

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
        // searchValue,
        // showNotify,
        // show,
        // onSearch,
        // onClickButton,
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

    methods: {
      toggleLang() {
        // this.$i18n.locale = this.$i18n.locale === 'en' ? 'cn' : 'en';
        localStorage.setItem('lang', this.$i18n.locale);
      },
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

    template: $tw.wiki.getTiddlerText(
      '$:/plugins/oeyoews/neotw-vue-todo/todo.vue'
    )
  };
  return component;
};

module.exports = todo;
