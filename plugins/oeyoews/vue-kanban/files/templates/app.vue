<template>
  <!-- https://github.com/Alfred-Skyblue/vue-draggable-plus/issues/118 -->
  <div hidden> {{allData[0].items}}
    <hr> {{allData[1].items}}
    <hr> {{allData[2].items}}
    <hr> {{form}}
  </div>
  <div
    class="relative overflow-x-auto gap-2 select-none not-prose ~bg-[#efefef] grid grid-cols-1 grid-rows-1 md:grid-cols-3 m-1 md:m-4 bg-white"
    ref="kanbanRef">
    <List @deleteItem="deleteItem" @editItem="editItem" @showDialog="showDialog" :data="list" :type="list.name"
      @kanbanFullscreen="kanbanFullscreen" v-for="list in allData" :key="list.name" @onUpdate="onUpdate" @onAdd="onAdd"
      @onRemove="onRemove" />

    <!-- 编辑 item 弹窗 -->
    <el-dialog v-model=" dialogFormVisible" title="Add items" :width="isMobile() ? '90%' : '60%'">
      <el-form :model="form" @submit.prevent="addNewItem">
        <el-form-item label="标题" props='name'>
          <el-input v-model="form.name" autocomplete="off" placeholder='Input Something ...' ref="inputRef" />
        </el-form-item>
        <el-form-item label="描述" props='description'>
          <!-- Ctrl + Enter to save -->
          <el-input type="textarea" v-model="form.description" class="w-full" :rows="4" @keyup.ctrl.enter="addNewItem"
            placeholder='Input Something ...' />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelDialog">Cancel</el-button>
          <el-button type="primary" @click="addNewItem"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>