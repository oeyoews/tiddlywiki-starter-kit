/*\
title: $:/plugins/oeyoews/neotw-vue-todo/component.js
type: application/javascript
module-type: library

\*/

const { watch, watchEffect, onMounted, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

const getTemplate = () => {
  let template = $tw.wiki
    .getTiddlerText('$:/plugins/oeyoews/neotw-vue-todo/todo.vue')
    .trim(); // trim to remove linebreak

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

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
        // TIP: 使用gettiddlertext 某个条目是否存在或者是否文本温控, 而不是使用tiddlerexist, 并且他也无法检测系统条目
        $tw.wiki.getTiddlerData(json, [])
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

      const progress = computed(() => {
        if (!todos.value?.length) {
          return '0%';
        }
        return (done.value / todos.value.length).toFixed(2) * 100 + '%';
      });

      watch(
        todos,
        () => {
          const data = toRaw(todos.value);
          // NOTE: 这里数据没有stringify, settiddlerdata 会自动带上转义符， 如果使用setText, 需要手动检查type 字段
          // TIP: 这里不进行minify, 便于用户查看数据
          $tw.wiki.setTiddlerData(json, data, null, {
            suppressTimestamp: true
          });
        },
        {
          deep: true
        }
      );

      const dragOptions = {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };

      const drag = ref(false);
      const editingIndex = ref(-1);

      const editingText = ref('');

      return {
        editingIndex,
        editingText,
        drag,
        dragOptions,
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

    directives: {
      focus: {
        mounted(el) {
          el.focus();
        }
      }
    },

    methods: {
      startEdit(todo) {
        this.editingIndex = todo.id;
        this.editingText = todo.text; // 把当前编辑项的text拷贝到临时变量
      },

      finishEdit(id) {
        if (this.editingText) {
          const currentTodoIndex = this.todos.findIndex((t) => t.id === id);
          this.todos[currentTodoIndex].text = this.editingText;
          this.todos[currentTodoIndex].date = new Date().toLocaleString();
        }
        this.cancelEdit(id);
        this.notify(this.t('todo.save'));
      },

      cancelEdit() {
        this.editingIndex = -1; // 重置编辑状态
        this.editingText = ''; // 清空临时变量
      },
      sort() {
        this.filteredTodos = this.filteredTodos.sort((a, b) => a.id - b.id);
      },
      notify(msg = 'notify', type = 'success', timeout = 2000) {
        toast(msg, {
          theme: 'auto',
          type,
          transition: 'slide',
          position: 'top-left',
          hideProgressBar: true,
          autoClose: timeout,
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
        this.notify(this.t('todo.notify'));
      },

      async resetTodos() {
        const confirm = window.confirm(this.t('todo.resetTodos'));
        confirm ? (this.todos = []) : null;
      },

      removeTodo(index) {
        this.todos.splice(index, 1);
      }
    },

    template: getTemplate()
  };
  return component;
};

module.exports = todo;
