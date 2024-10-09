<template>
  <h2 class="text-center">配置</h2>
  <el-form :label-position="top" label-width="auto">
    <!-- title -->
    <el-form-item label="标题" prop="title" clearable>
      <el-input v-model="title"></el-input>
    </el-form-item>
    <!-- subtitle -->
    <el-form-item label="副标题" prop="subtitle" clearable>
      <el-input v-model="subtitle"></el-input>
    </el-form-item>
    <el-form-item label="字体大小" prop="fontsize">
      <el-select v-model="fontsize">
        <el-option v-for="item in fontsizes" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <el-button @click="submit">保存配置</el-button>
</template>
</template>