<div class="xmax-w-3xl mx-auto px-4 py-6 text-sm text-gray-800 dark:text-gray-200 space-y-6">
  <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">图片上传</h1>

  <form @submit.prevent="handleUpload" class="space-y-3">
    <label
      class="block cursor-pointer rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 px-4 py-6 text-center transition hover:border-gray-500 hover:bg-gray-50 dark:hover:border-gray-500 dark:hover:bg-gray-800/50"
      :class="{ 'border-gray-600 bg-gray-50 dark:border-gray-500 dark:bg-gray-800/50': isDragover }"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @paste.stop.prevent="onPaste"
      tabindex="0"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        accept="image/jpeg,image/png,image/gif,image/webp"
        @change="onFileChange"
      />
      <span v-if="!selectedFileName" class="block text-gray-500 dark:text-gray-400">
        {{ hintText }}
      </span>
      <div v-else class="mt-2 flex flex-col items-center gap-2">
        <div class="text-gray-600 dark:text-gray-300 truncate text-xs" :title="selectedFileName">
          {{ selectedFileName }}
        </div>
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt="预览"
          class="h-24 w-auto rounded-md border border-gray-200 dark:border-gray-600 object-contain"
        />
        <div class="mt-2 w-full max-w-xs">
          <label class="mb-1 block text-left text-xs text-gray-500 dark:text-gray-400">上传前改名</label>
          <input
            v-model="uploadFileName"
            type="text"
            class="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-2 py-1.5 text-xs"
            :placeholder="selectedFileName || '文件名（可含扩展名）'"
          />
        </div>
      </div>
    </label>

    <div class="flex flex-wrap items-center justify-between gap-3">
      <button
        type="submit"
        class="inline-flex items-center rounded-md bg-gray-900 dark:bg-gray-100 px-4 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="!file || uploading"
      >
        <span v-if="uploading">上传中...</span>
        <span v-else>上传</span>
      </button>

      <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
        <span>复制格式</span>
        <select
          v-model="selectedFormat"
          @change="saveFormatPreference"
          class="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-2 py-1 text-xs"
        >
          <option value="md">Markdown</option>
          <option value="tw">Wikitext</option>
          <option value="link">链接</option>
        </select>
      </div>
    </div>
  </form>

  <div
    v-if="resultError || resultUrl || resultMessage"
    class="rounded-md border px-3 py-2 text-sm"
    :class="resultError ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-200' : 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/50 text-sky-800 dark:text-sky-200'"
  >
    <template v-if="!resultError && resultUrl">
      <div class="font-semibold mb-1">图片地址：
      <a
        class="break-all text-sky-700 dark:text-sky-300 underline"
        :href="resultUrl"
        target="_blank"
        rel="noreferrer"
      >
        {{ resultUrl }}
      </a>
      </div>
      <div class="mt-2 text-xs text-gray-700 dark:text-gray-300" v-if="resultCopied">
        已复制到剪贴板（{{ formatLabel }}）。
      </div>
    </template>
    <template v-else>
      {{ resultMessage }}
    </template>
  </div>

  <div class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
    <div class="flex flex-wrap items-center gap-2">
      <span class="font-semibold text-gray-900 dark:text-gray-100">图片列表</span>
      <input
        v-model="dateFilter"
        type="date"
        class="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-2 py-1 text-xs"
        @change="loadImages"
      />
      <button
        type="button"
        class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-2 py-1 text-xs hover:bg-gray-50 dark:hover:bg-gray-700"
        @click="loadImages"
      >
        刷新
      </button>
      <span v-if="imagesLoading" class="text-xs text-gray-500 dark:text-gray-400">加载中...</span>
    </div>

    <div
      class="max-h-80 overflow-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/30 p-2 text-xs space-y-1"
    >
      <div v-if="imagesError" class="text-red-600 dark:text-red-400">
        {{ imagesError }}
      </div>
      <div v-else-if="!imageGroups.length" class="text-gray-500 dark:text-gray-400">
        暂无图片
      </div>
      <template v-else>
        <div v-for="group in imageGroups" :key="group.date">
          <div class="mt-2 mb-1 font-semibold text-gray-700 dark:text-gray-300">
            {{ group.date }}
          </div>
          <div
            v-for="(img, index) in group.files"
            :key="img.path"
            class="border-t border-gray-100 dark:border-gray-700 py-2"
          >
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <img
                v-if="img.url"
                :src="img.url"
                alt="缩略图"
                class="h-10 w-10 flex-shrink-0 rounded border border-gray-200 dark:border-gray-600 object-cover self-start"
              />
              <div class="flex-1 min-w-0">
                <div class="break-words text-xs sm:text-[13px] text-gray-800 dark:text-gray-200">
                  <span class="mr-1 text-gray-400 dark:text-gray-500">#{{ index + 1 }}</span>{{ img.path }}
                </div>
                <div class="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                  大小：{{ formatSize(img.size) }}
                </div>
              </div>
              <div class="flex flex-wrap justify-start gap-1 text-[11px] sm:text-xs sm:justify-end">
                  <button
                    type="button"
                    class="rounded border border-gray-300 dark:border-gray-600 px-2 py-0.5 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
                    @click="openImage(img.url)"
                  >
                    打开
                  </button>
                  <button
                    type="button"
                    class="rounded border border-gray-300 dark:border-gray-600 px-2 py-0.5 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
                    @click="copyLink(img)"
                  >
                    <span v-if="img._copied">已复制</span>
                    <span v-else>复制链接</span>
                  </button>
                  <button
                    type="button"
                    class="rounded border border-red-200 dark:border-red-800 px-2 py-0.5 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50"
                    @click="deleteImage(img)"
                  >
                    删除
                  </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</div>
