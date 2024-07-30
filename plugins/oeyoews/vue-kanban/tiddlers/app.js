/*\
title: $:/plugins/oeyoews/vue-kanban/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('../neotw-vue3/getTemplate.js');
const List = require('./components/List.js');

const app = () => {
  const component = {
    components: { List },
    setup() {
      const devMode = ref(false);
      const state = ref({
        nostatus: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        todo: '',
        inprogress: '',
        done: '',
      });
      const list1 = ref([
        {
          name: '黑暗模式主题适配',
          id: '1',
        },
        {
          name: '做成一个单独布局',
          id: '2',
        },
        {
          name: '数据存储到本地Tiddler',
          id: '3',
        },
        {
          name: '样式优化',
          id: '4',
        },
        {
          name: '支持条目跳转',
          id: 5,
        },
        {
          name: '支持检测所有todo标签',
        },
      ]);
      const todo = ref([]);

      const inprogress = ref(
        list1.value.map((item) => ({
          name: `${item.name}-2`,
          id: `${item.id}-2`,
        })),
      );
      const done = ref([]);

      return {
        state,
        devMode,
        allData: [
          {
            name: 'todo',
            items: todo.value,
          },
          {
            name: 'inprogress',
            items: inprogress.value,
          },
          {
            name: 'done',
            items: done.value,
          },
        ],
      };
    },
    mounted() {
      console.log(this.state, this.allData);
    },

    methods: {
      onUpdate() {
        console.log('update');
      },
      onAdd() {
        console.log('add');
      },
      remove() {
        console.log('remove');
      },
    },

    template: getTemplate('oeyoews/vue-kanban/templates/app.vue'),
  };
  return component;
};

module.exports = app;
