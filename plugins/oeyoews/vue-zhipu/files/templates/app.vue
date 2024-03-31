<template>
  <div class="p-2 rounded">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="智谱 API" name="1">
        <input type="password" v-model="api_key"
          placeholder="API key，如: 1e9a8196d7e93079828c7f3e3c222db0.1xviOIMegcccW71i" class="w-full">
        <br>
        <span class="text-muted text-small mt-2">
          tip: 从这里查看和创建 API key：
          <a href="https://open.bigmodel.cn/usercenter/apikeys" target="_blank">
            https://open.bigmodel.cn/usercenter/apikeys
          </a>
        </span>
      </el-collapse-item>
    </el-collapse>

    <!-- step-02 post_body -->
    <div class="mb-5 hidden">
      <p>
        <textarea v-model="post_body" class="w-full h-48"></textarea>
        <span class="text-muted text-small">
          提示: 参数 "stream" 设为 true，则按流数据返回。设为 false，就是普通的 post 请求，普通读取其返回值就可以。
        </span>
      </p>
    </div>

    <!-- step-03 发送请求 -->
    <div class="my-5">
      <form @submit.prevent="btnClicked" class="flex gap-2">
        <el-input type="text" v-model="prompt" class="w-full" ref="chatRef" placeholder="输入内容" />
        <el-button native-type="submit" class="shrink-0">发送</el-button>
      </form>
      <div v-html="the_last_message_html" class="mt-8 rounded border-dimmed-700 p-2"></div>
      <!-- <div>
        <el-button @click="copyToClipboard" class="shrink-0">copy</el-button>
      </div> -->
    </div>
  </div>

</template>