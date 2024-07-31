/*\
title: $:/plugins/oeyoews/vue-kanban/app.js
type: application/javascript
module-type: library

\*/

const { reactive, ref } = window.Vue;

const { ElMessage, ElMessageBox } = require('element-plus.min.js');

const getTemplate = require('../neotw-vue3/getTemplate.js');
const List = require('./components/List.js');
const app = () => {
  // require缓存bug ？？？
  // const todoData = require('./todo');
  // console.log(require('./todo'));
  const todoData = [
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
      name: '支持条目跳转',
      id: 5,
    },
    {
      name: '支持检测所有todo标签',
      id: 6,
    },
    { name: 'disabled 当列表为空的时候', id: 9 },
  ];

  const component = {
    components: { List },
    data() {
      return {
        devMode: false,
        dialogFormVisible: false,
        todo: todoData,
        inprogress: [
          {
            name: '支持删除',
            id: 7,
          },
          {
            name: '样式优化',
            id: '4',
          },
          {
            name: '数据存储到本地Tiddler',
            id: '3',
          },
        ],
        done: [
          {
            name: '做成一个单独布局',
            id: 2,
          },
          {
            name: '支持输入框添加',
            id: 8,
          },
        ],
        form: {
          name: '',
          id: '',
        },
        currentEditItemType: '',
        // allData: reactive({ todo: todoData, inprogress: [], done: [] }),
      };
    },

    computed: {
      allData() {
        return [
          { name: 'todo', items: this.todo },
          { name: 'inprogress', items: this.inprogress },
          { name: 'done', items: this.done },
        ];
      },
    },

    watch: {
      todo() {
        // console.log('事项： 代办变了', this.todo);
      },
      allData(newV, oldV) {
        // console.log('便哈变了', this.allData);
      },
    },
    mounted() {
      this.log('mounted');
    },

    methods: {
      // hover drag to trash
      deleteItem(item, type) {
        ElMessageBox.confirm(
          'Are you sure you want to delete this item?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          },
        )
          .then(() => {
            this[type] = this[type].filter((i) => i.id !== item.id);
            ElMessage({
              type: 'success',
              message: 'Delete completed',
            });
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            });
          });
      },
      log(msg) {
        if (!this.devMode) return;
        console.log(msg);
      },
      addNewItem() {
        const type = this.currentEditItemType;
        if (!type) {
          console.log('未知类型');
          return;
        }
        this.log(this.form);
        if (!this.form.name.trim()) {
          return;
        }
        this.dialogFormVisible = false;
        if (this.form.id) {
          // 更新item
          const itemIndex = this[type].findIndex((item) => {
            return item.id === this.form.id;
          });
          if (itemIndex === -1) {
            return;
          }
          this[type][itemIndex].name = this.form.name;
        } else {
          // 新增item
          this[type].unshift({
            name: this.form.name,
            id: new Date().getTime(),
          });
        }
        this.emptyForm();
      },
      emptyForm() {
        this.form.name = '';
        this.form.id = '';
      },
      editItem(item, type) {
        this.form.name = item.name;
        this.form.id = item.id;
        this.showDialog(type);
      },
      showDialog(type) {
        this.currentEditItemType = type;
        // if (['inprogress', 'done'].includes(type)) return;
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          // TODO: nexttick 在tiddlywiki 收到了其他的input 影响了
          setTimeout(() => {
            this.$refs.inputRef?.focus();
          }, 0);
        });
      },
      cancelDialog() {
        this.emptyForm();
        this.dialogFormVisible = false;
      },
      onUpdate(e) {
        console.log('update', e);
      },
      onAdd(e) {
        console.log('add', e);
      },
      onRemove(e) {
        console.log('remove', e);
      },
      toggleDevMode() {
        this.devMode = !this.devMode;
      },
    },

    template: getTemplate('oeyoews/vue-kanban/templates/app.vue'),
  };
  return component;
};

module.exports = app;

const demo = {
  one: [
    {
      id: 99,
    },
  ],
  two: [
    {
      id: 22,
    },
  ],
};

Object.entries(demo).map((item) => {
  return {
    name: item[0],
    items: item[1],
  };
});
