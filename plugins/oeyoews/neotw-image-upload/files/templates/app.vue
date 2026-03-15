<div class="xmax-w-3xl mx-auto px-4 py-6 text-sm text-gray-800 dark:text-gray-200 space-y-8">
  <!-- 上传区：卡片化、层次清晰 -->
  <section class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 p-5 shadow-sm dark:shadow-none">
    <h1 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">图片上传</h1>

    <form
      @submit.prevent="handleUpload"
      @paste.stop.prevent="onPaste"
      class="space-y-4"
    >
      <label
        class="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 px-4 py-8 text-center transition-all duration-200 hover:border-gray-400 hover:bg-gray-50/80 dark:hover:border-gray-500 dark:hover:bg-gray-700/30 focus-within:ring-2 focus-within:ring-gray-400/50 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900"
        :class="{ 'border-gray-500 bg-gray-100/80 dark:border-gray-400 dark:bg-gray-700/50': isDragover }"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        tabindex="0"
      >
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          accept="image/jpeg,image/png,image/gif,image/webp"
          @change="onFileChange"
        />
        <span v-if="!selectedFileName" class="text-gray-500 dark:text-gray-400 text-sm">
          {{ hintText }}
        </span>
        <div v-else class="mt-2 flex flex-col items-center gap-2 w-full max-w-sm">
          <div class="text-gray-600 dark:text-gray-300 truncate max-w-full text-xs" :title="selectedFileName">
            {{ selectedFileName }}
          </div>
          <img
            v-if="previewUrl"
            :src="previewUrl"
            alt="预览"
            class="h-24 w-auto rounded-lg border border-gray-200 dark:border-gray-600 object-contain shadow-sm"
          />
          <div class="mt-2 flex w-full items-center gap-2">
            <label class="shrink-0 text-xs text-gray-500 dark:text-gray-400">文件名称</label>
            <input
              v-model="uploadFileName"
              type="text"
              class="min-w-0 flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-3 py-2 text-xs focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
              :placeholder="selectedFileName || '文件名（可含扩展名）'"
            />
          </div>
        </div>
      </label>

      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <span class="text-gray-500 dark:text-gray-500">图片链接复制类型</span>
          <select
            v-model="selectedFormat"
            @change="saveFormatPreference"
            class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-2.5 py-1.5 text-xs focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="md">Markdown</option>
            <option value="tw">Wikitext</option>
            <option value="link">链接</option>
          </select>
        </div>
        <p class="text-xs text-gray-400 dark:text-gray-500">
          支持 Ctrl+V 在本区域粘贴图片
        </p>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            @click="showImageList = !showImageList"
            :title="showImageList ? '隐藏图片列表' : '显示图片列表'"
          >
            {{ showImageList ? '隐藏列表' : '图片列表' }}
          </button>
          <button
            type="submit"
            class="inline-flex items-center rounded-lg bg-gray-900 dark:bg-gray-100 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            :disabled="!file || uploading"
          >
            <span v-if="uploading">上传中...</span>
            <span v-else>上传</span>
          </button>
        </div>
      </div>
    </form>
  </section>

  <div
    v-if="resultError || resultUrl || resultMessage"
    class="rounded-xl border px-4 py-3 text-sm"
    :class="resultError ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-200' : 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/50 text-sky-800 dark:text-sky-200'"
  >
    <template v-if="!resultError && resultUrl">
      <div class="font-medium mb-1">图片地址：</div>
      <div class="min-w-0 overflow-x-auto">
        <a
          class="inline-block whitespace-nowrap text-sky-700 dark:text-sky-300 underline hover:no-underline"
          :href="resultUrl"
          target="_blank"
          rel="noreferrer"
        >
          {{ resultUrl }}
        </a>
      </div>
      <div class="mt-2 text-xs text-gray-600 dark:text-gray-400" v-if="resultCopied">
        已复制到剪贴板（{{ formatLabel }}）。
      </div>
    </template>
    <template v-else>
      {{ resultMessage }}
    </template>
  </div>

  <!-- 图片列表：独立卡片区、表格式行、操作紧凑，默认隐藏 -->
  <section v-show="showImageList" class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 p-5 shadow-sm dark:shadow-none">
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-gray-100 dark:border-gray-700">
      <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">图片列表</h2>
      <div class="flex items-center gap-2">
        <input
          v-model="dateFilter"
          type="date"
          class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-2.5 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
          @change="loadImages"
        />
        <button
          type="button"
          class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          @click="loadImages"
        >
          刷新
        </button>
        <span v-if="imagesLoading" class="text-xs text-gray-500 dark:text-gray-400">加载中...</span>
      </div>
    </div>

    <div class="max-h-[320px] overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
      <div v-if="imagesError" class="p-4 text-sm text-red-600 dark:text-red-400">
        {{ imagesError }}
      </div>
      <div v-else-if="!imageGroups.length" class="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
        暂无图片
      </div>
      <template v-else>
        <div v-for="group in imageGroups" :key="group.date" class="p-2">
          <div class="mb-2 mt-1 px-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {{ group.date }}
          </div>
          <div
            v-for="(img, index) in group.files"
            :key="img.path"
            class="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-colors hover:bg-white hover:border-gray-200 dark:hover:bg-gray-800/60 dark:hover:border-gray-600"
          >
            <div class="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 text-xs font-medium">
              <img
                v-if="img.url"
                :src="img.url"
                alt=""
                class="relative z-[1] h-full w-full object-cover"
                @error="$event.target.style.display='none'"
              />
              <span class="absolute inset-0 z-0 flex items-center justify-center font-medium">{{ index + 1 }}</span>
            </div>
            <div class="min-w-0 flex-1">
              <div class="truncate text-[13px] text-gray-800 dark:text-gray-200" :title="img.path">
                <span class="mr-1.5 shrink-0 text-gray-400 dark:text-gray-500">#{{ index + 1 }}</span>
                <span class="truncate">{{ img.path }}</span>
              </div>
              <div class="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                大小：{{ formatSize(img.size) }}
              </div>
            </div>
            <div class="flex shrink-0 gap-1.5">
              <button
                type="button"
                class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-[11px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                @click="openImage(img.url)"
              >
                打开
              </button>
              <button
                type="button"
                class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-[11px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                @click="copyLink(img)"
              >
                <span v-if="img._copied">已复制</span>
                <span v-else>复制链接</span>
              </button>
              <button
                type="button"
                class="rounded-md border border-red-200 dark:border-red-800 px-2 py-1 text-[11px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                @click="deleteImage(img)"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</div>
