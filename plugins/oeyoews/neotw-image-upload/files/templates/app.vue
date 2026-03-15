<div class="xmax-w-3xl mx-auto px-4 py-6 text-sm text-gray-800 dark:text-gray-200 space-y-8">
  <section class="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 p-5 shadow-sm dark:shadow-none">
    <div class="mb-4 flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-700">
      <h1 class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ t.uploadTitle }}</h1>
      <div class="flex gap-1 text-xs">
        <button type="button" class="rounded px-2 py-1 transition-colors" :class="lang === 'en' ? 'bg-gray-200 dark:bg-gray-600 font-medium' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'" @click="setLang('en')">EN</button>
        <button type="button" class="rounded px-2 py-1 transition-colors" :class="lang === 'zh' ? 'bg-gray-200 dark:bg-gray-600 font-medium' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'" @click="setLang('zh')">中文</button>
      </div>
    </div>

    <form
      @submit.prevent="handleUpload"
      @paste.stop.prevent="onPaste"
      class="space-y-4"
    >
      <label
        class="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 px-4 py-10 text-center transition-all duration-200 hover:border-gray-400 hover:bg-gray-50/80 dark:hover:border-gray-500 dark:hover:bg-gray-700/30 focus-within:ring-2 focus-within:ring-gray-400/50 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900"
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
          {{ t.dropHint }}
        </span>
        <div v-else class="mt-2 flex flex-col items-center gap-2 w-full max-w-sm">
          <div class="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-0 text-center text-xs">
            <span class="text-gray-600 dark:text-gray-300 truncate max-w-full" :title="selectedFileName">{{ selectedFileName }}</span>
            <span v-if="file && file.size != null" class="shrink-0 text-[11px] text-gray-500 dark:text-gray-400">{{ t.size }}: {{ formatSize(file.size) }}</span>
          </div>
          <img
            v-if="previewUrl"
            :src="previewUrl"
            :alt="t.preview"
            class="h-24 w-auto rounded-md border border-gray-200 dark:border-gray-600 object-contain shadow-sm"
          />
          <div class="mt-2 flex w-full items-center gap-2">
            <label class="shrink-0 text-xs text-gray-500 dark:text-gray-400">{{ t.fileName }}</label>
            <input
              v-model="uploadFileName"
              type="text"
              class="min-w-0 flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-3 py-2 text-xs focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
              :placeholder="selectedFileName || t.fileNamePlaceholder"
            />
          </div>
        </div>
      </label>

      <div class="flex flex-wrap items-center justify-between gap-4">
        <p class="text-xs text-gray-400 dark:text-gray-500">
          {{ t.pasteHint }}
        </p>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            @click="showImageList = !showImageList"
            :title="showImageList ? t.hideImageList : t.showImageList"
          >
            {{ showImageList ? t.hideList : t.imageList }}
          </button>
          <button
            type="submit"
            class="inline-flex items-center rounded-md bg-gray-900 dark:bg-gray-100 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            :disabled="!file || uploading"
          >
            <span v-if="uploading">{{ t.uploading }}</span>
            <span v-else>{{ t.upload }}</span>
          </button>
        </div>
      </div>
    </form>
  </section>

  <template v-if="!resultError && resultUrl">
    <div class="relative rounded-md border border-sky-200/80 dark:border-sky-700/80 bg-sky-50/60 dark:bg-sky-950/40 overflow-hidden">
        <div class="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-sky-200/80 dark:border-sky-800/80 bg-sky-50/50 dark:bg-sky-950/30">
          <img
            :src="resultUrl"
            :alt="t.preview"
            class="size-8 shrink-0 rounded-full border border-sky-200/60 dark:border-sky-700/60 object-cover bg-white/50 dark:bg-sky-950/30"
          />
          <div class="flex items-center gap-2">
            <select
              v-model="selectedFormat"
              @change="saveFormatPreference"
              class="appearance-none rounded-md border border-sky-200 dark:border-sky-700 bg-white dark:bg-sky-900/50 text-sky-800 dark:text-sky-200 px-2.5 py-1.5 text-xs font-medium focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 dark:focus:ring-sky-500"
            >
              <option value="md">Markdown</option>
              <option value="tw">Wikitext</option>
              <option value="link">{{ t.link }}</option>
            </select>
            <button
              type="button"
              class="rounded-md border border-sky-200 dark:border-sky-700 bg-white dark:bg-sky-900/50 px-3 py-1.5 text-xs font-medium text-sky-800 dark:text-sky-200 hover:bg-sky-100 dark:hover:bg-sky-800/50 transition-colors"
              @click="copySnippet(selectedFormat)"
            >
              {{ resultCopied ? t.copied : t.copy }}
            </button>
          </div>
        </div>
        <div class="relative min-w-0 overflow-x-auto p-3">
          <pre class="m-0 rounded-md bg-sky-100/80 dark:bg-sky-950/50 px-4 py-3 text-[13px] font-mono leading-relaxed text-sky-900 dark:text-sky-100 whitespace-pre break-all select-text"><code>{{ displaySnippet }}</code></pre>
        </div>
      </div>
  </template>
  <div
    v-else-if="resultError || resultMessage"
    class="rounded-md border px-4 py-3 text-sm"
    :class="resultError ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-200' : 'border-sky-200 dark:border-sky-800 bg-sky-50/80 dark:bg-sky-950/30 text-sky-800 dark:text-sky-200'"
  >
    {{ resultMessage }}
  </div>

  <section v-show="showImageList" class="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 p-5 shadow-sm dark:shadow-none">
    <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">{{ t.imageList }}</h2>

    <!-- 筛选与刷新：置于上方、居右 -->
    <div class="mb-4 flex flex-wrap items-center justify-end gap-2">
      <input
        v-model="dateFilter"
        type="date"
        class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-2.5 py-1.5 text-xs focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
        @change="loadImages"
      />
      <button
        type="button"
        class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        @click="loadImages"
      >
        {{ t.refresh }}
      </button>
      <span v-if="imagesLoading" class="text-xs text-gray-500 dark:text-gray-400">{{ t.loading }}</span>
    </div>

    <!-- 路径信息 -->
    <div v-if="storagePath || configPath" class="mb-4 flex flex-col gap-1.5 text-[11px]">
      <div v-if="storagePath" class="flex min-w-0 items-center gap-2 rounded-md bg-gray-100 dark:bg-gray-700/60 px-2.5 py-1.5">
        <span class="w-10 shrink-0 text-gray-500 dark:text-gray-400">{{ t.storage }}</span>
        <span :title="storagePath" class="min-w-0 flex-1 truncate font-mono text-gray-700 dark:text-gray-300">{{ storagePath }}</span>
        <button type="button" class="shrink-0 rounded px-2 py-0.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-200 transition-colors" :title="t.copyStoragePath" @click="copyPath(storagePath, 'storage')">
          <span v-if="pathCopied === 'storage'">{{ t.copied }}</span>
          <span v-else>{{ t.copy }}</span>
        </button>
      </div>
      <div v-if="configPath" class="flex min-w-0 items-center gap-2 rounded-md bg-gray-100 dark:bg-gray-700/60 px-2.5 py-1.5">
        <span class="w-10 shrink-0 text-gray-500 dark:text-gray-400">{{ t.config }}</span>
        <span :title="configPath" class="min-w-0 flex-1 truncate font-mono text-gray-700 dark:text-gray-300">{{ configPath }}</span>
        <button type="button" class="shrink-0 rounded px-2 py-0.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-200 transition-colors" :title="t.copyConfigPath" @click="copyPath(configPath, 'config')">
          <span v-if="pathCopied === 'config'">{{ t.copied }}</span>
          <span v-else>{{ t.copy }}</span>
        </button>
      </div>
    </div>

    <!-- 列表区域 -->
    <div class="max-h-[520px] overflow-auto rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
      <div v-if="imagesError" class="p-4 text-sm text-red-600 dark:text-red-400">
        {{ imagesError }}
      </div>
      <div v-else-if="!imageGroups.length" class="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/30 py-12 px-4 text-center">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-300">{{ t.noImages }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ t.noImagesHint }}</p>
      </div>
      <template v-else>
        <div v-for="group in imageGroups" :key="group.date" class="p-2">
          <div class="mb-2 mt-1 px-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {{ group.date }}
          </div>
          <div
            v-for="(img, index) in group.files"
            :key="img.path"
            class="group flex items-center gap-3 rounded-md border border-transparent px-3 py-2.5 transition-colors hover:bg-white hover:border-gray-200 dark:hover:bg-gray-800/60 dark:hover:border-gray-600"
          >
            <div class="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 text-xs font-medium">
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
                {{ t.size }}: {{ formatSize(img.size) }}
              </div>
            </div>
            <div class="flex shrink-0 gap-1.5">
              <button
                type="button"
                class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-[11px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                @click="openImage(img.url)"
              >
                {{ t.open }}
              </button>
              <button
                type="button"
                class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-[11px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                @click="copyLink(img)"
              >
                <span v-if="img._copied">{{ t.copied }}</span>
                <span v-else>{{ t.copyLink }}</span>
              </button>
              <button
                type="button"
                class="rounded-md border border-red-200 dark:border-red-800 px-2 py-1 text-[11px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                @click="deleteImage(img)"
              >
                {{ t.delete }}
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</div>
