/*\
title: $:/plugins/oeyoews/vue-kanban/app.js
type: application/javascript
module-type: library

\*/

const { reactive, ref } = window.Vue;

const getTemplate = require('../neotw-vue3/getTemplate.js');
const List = require('./components/List.js');
const todoData = require('./todo');

const app = () => {
  const component = {
    components: { List },
    setup() {
      // 开发模式调试: log
      const devMode = ref(true);
      // 事项： 代办
      const todo = ref(todoData);

      // 事项： 进行中
      const inprogress = ref([]);
      // 事项： 已完成
      const done = ref([]);
      // 弹窗状态
      const dialogFormVisible = ref(false);
      // 新增数据表单
      const form = reactive({
        name: '',
        id: '',
      });
      // 用于判断当前正在编辑的类别 todo | inprogress | done
      const currentEditItemType = ref('');

      return {
        currentEditItemType,
        form,
        devMode,
        dialogFormVisible,
        todo,
        inprogress,
        done,
        allData: ref([
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
        ]),
      };
    },

    watch: {
      todo() {
        console.log('事项： 代办变了', this.todo);
      },
      allData(newV, oldV) {
        console.log('便哈变了', this.allData);
      },
    },
    mounted() {},

    methods: {
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
        const dataMap = {
          todo: this.todo,
          inprogress: this.inprogress,
          done: this.done,
        };
        this.dialogFormVisible = false;
        if (this.form.id) {
          // 更新item
          const itemIndex = dataMap[type].findIndex((item) => {
            return item.id === this.form.id;
          });
          if (itemIndex === -1) {
            return;
          }
          dataMap[type][itemIndex].name = this.form.name;
        } else {
          // 新增item
          dataMap[type].unshift({
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
      onRemove() {
        console.log('remove');
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
