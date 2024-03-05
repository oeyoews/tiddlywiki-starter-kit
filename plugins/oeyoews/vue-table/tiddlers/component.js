/*\
title: $:/plugins/oeyoews/vue-table/component.js
type: application/javascript
module-type: library

\*/

const { toRaw, reactive, ref } = window.Vue;

const vtable = (json = 'table.json') => {
  const component = {
    setup() {
      const xTable = ref();
      const tableData = ref(
        $tw.wiki.tiddlerExists(json) ? $tw.wiki.getTiddlerData(json) : []
      );

      // TODO: 给json 加上 global.list, 防止已有数据被覆盖
      // TODO: 如果一些默认值为空， 不要存储
      const formData = reactive({
        name: '',
        nickname: '',
        role: '',
        sex: '',
        age: 0,
        num: 0,
        checkedList: [],
        flag1: false,
        date3: '',
        address: ''
      });

      const submitLoading = ref(false);
      const showEdit = ref(false);
      const selectRow = ref();
      const sexList = ref([
        { label: '男', value: '0' },
        { label: '女', value: '1' }
      ]);

      const formRules = reactive({
        name: [
          { required: true, message: '请输入名称' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符' }
        ],
        nickname: [{ required: false, message: '请输入昵称' }],
        sex: [{ required: false, message: '请选择性别' }]
      });

      return {
        xTable,
        tableData,
        formData,
        submitLoading,
        showEdit,
        selectRow,
        sexList,
        formRules
      };
    },

    watch: {
      tableData: {
        handler() {
          const data = toRaw(this.xTable.getTableData().tableData);
          $tw.wiki.setText(json, 'text', null, JSON.stringify(data), {
            suppressTimestamp: true
          });
        },
        deep: true // 深度监听
      }
    },

    mounted() {
      if (!$tw.wiki.tiddlerExists(json)) {
        $tw.wiki.setText(json, 'type', null, 'application/json', {
          suppressTimestamp: true
        });
      }

      $tw.wiki.setText(json, 'text', null, '[]', {
        suppressTimestamp: true
      });
    },

    methods: {
      formatterSex({ cellValue }) {
        const item = this.sexList.find((item) => item.value === cellValue);
        return item ? item.label : '';
      },
      visibleMethod({ data }) {
        return data.flag1 === 'Y';
      },
      insertEvent() {
        Object.assign(this.formData, {
          id: this.xTable.getTableData().tableData.length,
          name: '',
          nickname: '',
          role: '',
          sex: '',
          age: 0,
          num: 0,
          checkedList: [],
          flag1: false,
          date3: '',
          address: ''
        });
        this.selectRow = null;
        this.showEdit = true;
      },
      editEvent(row) {
        Object.assign(this.formData, row);
        this.selectRow = row;
        this.showEdit = true;
      },

      cellDBLClickEvent({ row }) {
        editEvent(row);
      },

      async removeEvent(row) {
        const type = await VXETable.modal.confirm('您确定要删除该数据?');
        if (type === 'confirm') {
          const $table = this.xTable;
          if ($table) {
            $table.remove(row);
            this.tableData = this.tableData.filter(
              (item) => item.id !== row.id
            );
          }
        }
      },
      submitEvent() {
        this.submitLoading = true;
        const $table = this.xTable;
        if ($table) {
          this.submitLoading = false;
          this.showEdit = false;
          if (this.selectRow) {
            VXETable.modal.message({
              content: '保存成功',
              status: 'success'
            });
            Object.assign(this.selectRow, this.formData);
          } else {
            VXETable.modal.message({
              content: '新增成功',
              status: 'success'
            });
            window.$table = this.xTable;
            $table.insert({ ...this.formData }); // 临时UI数据
            this.tableData.push({ ...this.formData }); // 真实数据
          }
        }
      }
    },

    template: $tw.wiki.getTiddlerText(
      '$:/plugins/oeyoews/vue-table/vue-table.vue'
    )
  };
  return component;
};

module.exports = vtable;
