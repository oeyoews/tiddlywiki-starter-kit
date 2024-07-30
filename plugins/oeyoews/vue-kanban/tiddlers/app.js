/*\
title: $:/plugins/oeyoews/vue-kanban/app.js
type: application/javascript
module-type: library

\*/

const { reactive, ref } = window.Vue;

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
      const todo = ref([
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
      ]);

      const inprogress = ref([]);
      const done = ref([]);
      const dialogFormVisible = ref(false);
      const form = reactive({
        name: '',
        id: '',
      });
      // 用于判断当前正在编辑的类别 todo | inprogress | done
      const currentEditItemType = ref('');

      return {
        currentEditItemType,
        form,
        state,
        devMode,
        dialogFormVisible,
        todo,
        inprogress,
        done,
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
    mounted() {},

    methods: {
      addNewItem() {
        const type = this.currentEditItemType;
        if (!type) {
          console.log('未知类型');
          return;
        }
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
          dataMap[type].push({
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
      onUpdate() {
        console.log('update');
      },
      onAdd() {
        console.log('add');
      },
      onRemove() {
        console.log('remove');
      },
    },

    template: getTemplate('oeyoews/vue-kanban/templates/app.vue'),
  };
  return component;
};

module.exports = app;
