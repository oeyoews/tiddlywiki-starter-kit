<template>
  <h2>文件树</h2>
  <!-- <el-input v-model="filterText" style="width: 240px" placeholder="搜索文章" /> -->

  <el-tree style="max-width: 500px" :data="data" :props="defaultProps" :filter-node-method="filterNode" ref="treeRef"
    accordion @node-click="handleNodeClick" class="p-2 m-1" :props="{ class: '' }" />
</template>