/*\
title: $:/plugins/oeyoews/vue-kanban/todo.js
type: application/javascript
module-type: library

\*/

/**
 * @typedef {Object} Item
 * @property {string} name 事项
 * @property {string} id 事项id
 */

/** @type {Item[]} */
module.exports = [
  {
    name: '添加设置',
    id: 'setup',
  },
  {
    name: '添加垃圾桶第四列',
    id: 0,
  },
  {
    name: '无法重新排序',
    id: '01',
  },
  {
    name: '黑暗模式主题适配',
    id: 1,
  },
  {
    name: '做成一个单独布局',
    id: 2,
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
    id: 6,
  },
  {
    name: '支持删除',
    id: 7,
  },
  {
    name: '支持输入框添加',
    id: 8,
  },
  { name: 'disabled 当列表为空的时候', id: 9 },
];
