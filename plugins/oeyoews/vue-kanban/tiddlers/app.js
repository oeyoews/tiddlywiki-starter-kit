/*\
title: $:/plugins/oeyoews/vue-kanban/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const Version = require('./components/Version');

const app = () => {
  const component = {
    setup() {
      const state = ref({
        nostatus: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        todo: '',
        inprogress: '',
        done: ''
      });
      const list1 = ref([
        {
          name: 'Joao',
          id: '1'
        },
        {
          name: 'Jean',
          id: '2'
        },
        {
          name: 'Johanna',
          id: '3'
        },
        {
          name: 'Juan',
          id: '4'
        }
      ]);
      const list2 = ref(
        list1.value.map((item) => ({
          name: `${item.name}-2`,
          id: `${item.id}-2`
        }))
      );

      const list3 = ref(
        list1.value.map((item) => ({
          name: `${item.name}-3`,
          id: `${item.id}-3`
        }))
      );

      return { state, list1, list2, list3 };
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
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-kanban/templates/app.vue'),

    components: {
      Version
    }
  };
  return component;
};

module.exports = app;
