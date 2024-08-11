<template>
  <el-form @submit.native.prevent>
    <el-form-item>
      <el-input type='textarea' :autosize="{ minRows: 4, maxRows: 10 }" placeholder='请输入内容*' v-model="text"></el-input>
    </el-form-item>
  </el-form>
  <div class="flex gap-1">
    <el-input placeholder='你的昵称' v-model="username"></el-input>
    <el-mention :options="emailSuffixOptions" placeholder='你的邮箱*' v-model.trim="email"></el-mention>
    <!-- 做成弹窗 -->
    <el-select v-model="version" placeholder="选择版本">
      <el-option v-for="item in versions" :key="item" :label="item" :value="item">
      </el-option>
    </el-select>
    <el-upload :auto-upload="false" :on-change="handleSuccess" :show-file-list="false">
      <el-button>上传</el-button>
    </el-upload>
    <el-button @click="sendMessage">
      发送
    </el-button>
  </div>
</template>