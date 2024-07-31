<template>
  <!-- https://github.com/Alfred-Skyblue/vue-draggable-plus/issues/118 -->
  <div
    class="relative min-h-0 overflow-x-auto gap-2 select-none not-prose ~bg-[#efefef] grid grid-cols-1 grid-rows-1 md:grid-cols-3 m-4">
    <template v-for="list in allData" :key="list.name">
      <List @editItem="editItem" @show="showDialog" :data="list.items" :type="list.name" @onUpdate="onUpdate"
        @onAdd="onAdd" @remove="remove" />
    </template>
  </div>

  <!-- dialog -->
  <el-dialog v-model="dialogFormVisible" title="Add items" width="500">
    <el-form :model="form" @submit.prevent="addNewItem">
      <el-form-item label="" label-width="" props='name'>
        <el-input v-model="form.name" autocomplete="off" placeholder='Input Something ...' ref="inputRef" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelDialog">Cancel</el-button>
        <el-button type="primary"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>