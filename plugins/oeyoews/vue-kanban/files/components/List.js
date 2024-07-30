const {
  createPluginTemplate: create,
} = require('../../neotw-vue3/createPluginTemplate.js');

const getTemplate = create('oeyoews/vue-kanban');
const icons = require('../icons');

module.exports = {
  name: 'List',
  props: ['data', 'type'],
  data() {
    return {
      emptyTips: {
        todo: '暂无代办事项',
        inprogress: '代办事项已全部完成',
        done: '所有事项已完成',
      },
      tags: {
        todo: 'info',
        inprogress: 'success',
        done: 'primary',
      },
      icons,
      upperedType: '',
    };
  },
  mounted() {
    console.log(this.data);
    this.upperFirstLetter(this.type);
  },
  methods: {
    upperFirstLetter(str) {
      this.upperedType = str.slice(0, 1).toUpperCase() + str.slice(1);
    },
  },
  template: getTemplate('List.vue'),
};
