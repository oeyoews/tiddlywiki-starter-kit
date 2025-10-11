<template>
  <div>
    <div class="flex gap-2">
      <button @click="fetchClipboard">点击读取粘贴板内容</button>
      <button @click="clean" :disabled="clipboardContent === ''">清空内容 </button>
      <button @click="importTiddler" :disabled="clipboardContent === ''">
        导入
      </button>
      <button @click="importTiddler" :disabled="clipboardContent === ''">
        导入并编辑
      </button>
    </div>

    <!-- <title v-model="title">
      {{title}}
    </title> -->

    <!-- // 使用 modal 的形式？？？ -->
    <Transition>
      <div v-show="clipboardContent">
        <h3>粘贴板内容预览：</h3>
        <h2></h2>
        <div
          class="antialiased prose prose-gray max-w-none prose-img:my-0 prose-a:no-underline prose-h2:mt-4 prose-blockquote:not-italic dark:prose-invert dark:prose-pre:bg-[#282c34] dark:prose-pre:text-white prose-p:mt-0">
          <p v-html="html"></p>
        </div>
    </Transition>

  </div>
  </div>
</template>