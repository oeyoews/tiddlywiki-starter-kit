/*\
title: $:/plugins/oeyoews/vue-kanban/app.js
type: application/javascript
module-type: library

\*/

const { reactive, ref } = window.Vue;

const {
  ElMessage,
  ElMessageBox,
  ElNotification,
} = require('element-plus.min.js');

const getTemplate = require('../neotw-vue3/getTemplate.js');
const List = require('./components/List.js');
/**
 * @param {string} tiddler - data tiddler name
 */
const app = (tiddler = 'kanban.json') => {
  // require缓存bug ？？？
  // const todoData = require('./todo');
  // console.log(require('./todo'));

  const component = {
    components: { List },
    data() {
      const emptyData = ['todo', 'inprogress', 'done'].map((i) => {
        return { name: i, items: [] };
      });

      const realData = $tw.wiki.getTiddlerData(tiddler) || emptyData;

      return {
        devMode: false,
        dialogFormVisible: false,
        // 这里的数据一定要是响应式的
        allData: realData,
        form: {
          name: '',
          id: '',
          description: '',
        },
        currentEditItemType: '',
        // allData: reactive({ todo: todoData, inprogress: [], done: [] }),
      };
    },

    watch: {
      todo(newV, onlV) {
        this.log(newV, onlV);
      },
      inprogress(newV, onlV) {
        this.log(newV, onlV);
      },
      done(newV, onlV) {
        this.log(newV, onlV);
      },
      allData(newV, oldV) {
        // NOTE: 无法监听到数据顺序的变化, 需要在on-event 里面分别手动处理
        // console.log('allData');
      },
    },

    methods: {
      kanbanFullscreen() {
        const target = this.$refs['kanbanRef'];
        if (!target.requestFullscreen) {
          ElNotification({
            title: '不支持全屏',
            // message: '',
            type: 'error',
          });
          return;
        }
        if (document.fullscreenElement === null) {
          target.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      },
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
            const dataIndex = this.allData.findIndex((i) => i.name === type);
            const data = this.allData[dataIndex].items;
            data.splice(
              data.findIndex((i) => i.id === item.id),
              1,
            );
            this.saveData();
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
      log(...msg) {
        if (!this.devMode) return;
        console.log(...msg);
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
        const dataIndex = this.allData.findIndex((i) => i.name === type);
        const data = this.allData[dataIndex].items;
        if (this.form.id) {
          // 更新item
          const itemIndex = data.findIndex((item) => {
            return item.id === this.form.id;
          });
          if (itemIndex === -1) {
            return;
          }
          data[itemIndex].name = this.form.name;
          data[itemIndex].description = this.form?.description;
        } else {
          // 新增item
          data.unshift({
            name: this.form.name,
            id: new Date().getTime(),
            description: this.form?.description,
          });
        }
        this.emptyForm();
        this.saveData();
      },
      emptyForm() {
        this.form.name = '';
        this.form.id = '';
        this.form.description = '';
      },
      editItem(item, type) {
        this.form.name = item.name;
        this.form.id = item.id;
        this.form.description = item.description;
        this.showDialog(type);
        this.saveData();
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
      saveData() {
        // console.log(this.allData);
        $tw.wiki.setTiddlerData(tiddler, this.allData, null, {
          suppressTimestamp: true,
        });
      },
      onUpdate(e) {
        // console.log('update', e);
        this.saveData();
      },
      onAdd(e) {
        this.log('add', e);
        this.saveData();
      },
      onRemove(e) {
        this.log('remove', e);
        this.saveData();
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
