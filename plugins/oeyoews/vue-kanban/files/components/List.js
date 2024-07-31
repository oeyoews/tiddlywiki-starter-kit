const {
  createPluginTemplate: create,
} = require('../../neotw-vue3/createPluginTemplate.js');

const getTemplate = create('oeyoews/vue-kanban');
const icons = require('../icons');

const isDraggable =
  $tw.wiki.getTiddlerText('$:/config/DragAndDrop/Enable') === 'yes';

module.exports = {
  name: 'List',
  props: ['data', 'type'],
  data() {
    return {
      // 是否给开篇添加背景颜色
      colorful: false,
      colors: {
        todo: 'bg-orange-200',
        inprogress: 'bg-lime-200',
        done: 'bg-blue-200',
      },
      emptyTips: {
        todo: '暂无代办事项',
        inprogress: '代办事项已全部完成',
        done: '所有事项已完成',
      },
      tags: {
        todo: 'warning',
        inprogress: 'success',
        done: 'primary',
      },
      icons,
      upperedType: '',
      isTODO: false,
      // 如果tiddlywiki 开启了全局拖拽(tw 默认启用， 建议关闭， 因为 forcefallback 的效果不够流畅）， 就默认启用forcefallback
      forceFallback: isDraggable,
    };
  },
  mounted() {
    this.upperFirstLetter(this.type);
    this.isTODO = this.type === 'todo';
  },
  methods: {
    upperFirstLetter(str) {
      if (!str || typeof str !== 'string') return;
      this.upperedType = str?.slice(0, 1).toUpperCase() + str.slice(1);
    },
  },
  template: getTemplate('List.vue'),
};
