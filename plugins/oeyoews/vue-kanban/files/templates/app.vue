<template>
  <div
    class="relative min-h-0 overflow-x-auto gap-2 select-none not-prose ~bg-[#efefef] grid grid-cols-1 grid-rows-1 md:grid-cols-3">
    <template v-for="(list, index) in allData" :key="index">
      <List @show="showDialog" :data="list.items" :type="list.name" @onUpdate="onUpdate" @onAdd="onAdd"
        @remove="remove" />
    </template>
  </div>

  <!-- dialog -->
  <el-dialog v-model="dialogFormVisible" title="Add items" width="500">
    <el-form :model="form" @submit.prevent="addNewItem">
      <el-form-item label="" label-width="">
        <el-input v-model="form.name" autocomplete="off" placeholder='Input Something ...' />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addNewItem">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>