<template>
  <!-- https://github.com/Alfred-Skyblue/vue-draggable-plus/issues/118 -->
  <div hidden> {{allData[0].items}}
    <hr> {{allData[1].items}}
    <hr> {{allData[2].items}}
  </div>
  <div
    class="relative min-h-0 overflow-x-auto gap-2 select-none not-prose ~bg-[#efefef] grid grid-cols-1 grid-rows-1 md:grid-cols-3 m-1 md:m-4">
    <List @deleteItem="deleteItem" @editItem="editItem" @showDialog="showDialog" :data="list.items" :type="list.name"
      v-for="list in allData" :key="list.name" @onUpdate=" onUpdate" @onAdd="onAdd" @onRemove="onRemove" />
  </div>

  <!-- 编辑 item 弹窗 -->
  <el-dialog v-model=" dialogFormVisible" title="Add items" width="50%">
    <el-form :model="form" @submit.prevent="addNewItem">
      <el-form-item label="" label-width="" props='name'>
        <el-input v-model="form.name" autocomplete="off" placeholder='Input Something ...' ref="inputRef" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelDialog">Cancel</el-button>
        <el-button type="primary" @click="addNewItem"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>