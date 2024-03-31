<template>
  <div class="mb-50">
    <!-- step-01 api_key -->
    <div class="mb-50">
      <p>
        <b>👉 01. 输入你的 API key</b>
      </p>
      <p>
        <input type="text" v-model="api_key" placeholder="API key，如: 1e9a8196d7e93079828c7f3e3c222db0.1xviOIMegcccW71i"
          class="w-full">
        <br>
        <span class="text-muted text-small">
          tip: 从这里查看和创建 API key：
          <a href="https://open.bigmodel.cn/usercenter/apikeys" target="_blank">
            https://open.bigmodel.cn/usercenter/apikeys
          </a>
        </span>
      </p>
    </div>

    <!-- step-02 post_body -->
    <div class="mb-50">
      <p>
        <b>👉 02. 组织 Post body</b>
      </p>
      <p>
        <textarea v-model="post_boby" class="w-full h-48"></textarea>
        <span class="text-muted text-small">
          tip: 参数 "stream" 设为 true，则按流数据返回。设为 false，就是普通的 post 请求，普通读取其返回值就可以。
        </span>
      </p>
    </div>

    <!-- step-03 发送请求 -->
    <div class="mb-50">
      <p>
        <b>👇发送请求</b>
      </p>
      <p>
        <button @click="btnClicked()">Run</button>
      </p>
      <div v-html="the_last_message_html"></div>
    </div>

</template>