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
          name: 'Joao',
          id: '1',
        },
        {
          name: 'Jean',
          id: '2',
        },
        {
          name: 'Johanna',
          id: '3',
        },
        {
          name: 'Juan',
          id: '4',
        },
      ]);
      const todo = ref([]);

      const inprogress = ref(
        list1.value.map((item) => ({
          name: `${item.name}-2`,
          id: `${item.id}-2`,
        })),
      );
      const done = ref(
        list1.value.map((item) => ({
          name: `${item.name}-3`,
          id: `${item.id}-3`,
        })),
      );

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
