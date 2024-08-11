<template>
  <el-form @submit.native.prevent>
    <el-row justify="space-between">
      <el-col :span="11">
        <el-form-item>
          <el-input placeholder='你的昵称' v-model="username"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item>
          <el-input placeholder='你的邮箱*' v-model="email"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-input type='textarea' :autosize="{ minRows: 4, maxRows: 10 }" placeholder='请输入内容*' v-model="text"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="sendMessage">
        发送
      </el-button>
    </el-form-item>
  </el-form>
</template>