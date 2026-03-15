<div class="mx-auto xmax-w-3xl max-w-[100vw] px-3 py-4 sm:px-0 sm:py-0 text-sm text-gray-800 dark:text-gray-200 space-y-6 sm:space-y-8">
  <section class="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 p-3 shadow-sm dark:shadow-none sm:p-5">
    <div class="mb-3 flex min-w-0 flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100 dark:border-gray-700 sm:mb-4">
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
        class="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 px-3 py-6 text-center transition-all duration-200 sm:min-h-[220px] sm:px-4 sm:py-10 hover:border-gray-400 hover:bg-gray-50/80 dark:hover:border-gray-500 dark:hover:bg-gray-700/30 focus-within:ring-2 focus-within:ring-gray-400/50 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900"
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
        <div v-else class="mt-2 flex w-full max-w-full flex-col items-center gap-2 sm:max-w-sm">
          <div class="flex w-full min-w-0 flex-wrap items-center justify-center gap-x-2 gap-y-0 text-center text-xs">
            <span class="min-w-0 truncate text-gray-600 dark:text-gray-300" :title="selectedFileName">{{ selectedFileName }}</span>
            <span v-if="file && file.size != null" class="shrink-0 text-[11px] text-gray-500 dark:text-gray-400">{{ t.size }}: {{ formatSize(file.size) }}</span>
          </div>
          <img
            v-if="previewUrl"
            :src="previewUrl"
            :alt="t.preview"
            class="max-h-20 w-auto max-w-full rounded-md border border-gray-200 dark:border-gray-600 object-contain shadow-sm sm:max-h-24"
          />
          <div class="mt-2 flex w-full min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">
            <label class="shrink-0 text-xs text-gray-500 dark:text-gray-400">{{ t.fileName }}</label>
            <input
              v-model="uploadFileName"
              type="text"
              class="min-w-0 flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 px-2 py-1.5 text-xs sm:px-3 sm:py-2 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
              :placeholder="selectedFileName || t.fileNamePlaceholder"
            />
          </div>
        </div>
      </label>

      <div class="flex min-w-0 flex-wrap items-center justify-between gap-2 sm:gap-4">
        <p class="min-w-0 flex-1 text-center text-xs text-gray-400 dark:text-gray-500 sm:flex-initial sm:text-left">
          {{ t.pasteHint }}
        </p>
        <div class="flex shrink-0 flex-wrap items-center justify-end gap-1.5 sm:gap-2">
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
    <div class="relative min-w-0 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/50 overflow-hidden">
        <div class="flex min-w-0 flex-wrap items-center justify-between gap-1.5 border-b border-gray-200 dark:border-gray-600 bg-gray-50 px-2 py-1.5 dark:bg-gray-800/80 sm:gap-2 sm:px-3 sm:py-2">
          <img
            :src="resultUrl"
            :alt="t.preview"
            class="size-7 shrink-0 rounded-full border border-gray-200 dark:border-gray-600 object-cover bg-gray-100 dark:bg-gray-700 sm:size-8"
          />
          <div class="flex min-w-0 flex-wrap items-center justify-end gap-1 sm:gap-2">
            <select
              v-model="selectedFormat"
              @change="saveFormatPreference"
              class="appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2.5 py-1.5 text-xs font-medium focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500"
            >
              <option value="md">Markdown</option>
              <option value="tw">Wikitext</option>
              <option value="link">{{ t.link }}</option>
            </select>
            <button
              type="button"
              class="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              @click="copySnippet(selectedFormat)"
            >
              {{ resultCopied ? t.copied : t.copy }}
            </button>
          </div>
        </div>
        <div class="relative min-w-0 overflow-x-auto p-2 sm:p-3">
          <pre class="m-0 rounded-md bg-gray-100 px-3 py-2 text-xs font-mono leading-relaxed text-gray-800 dark:bg-gray-900/50 dark:text-gray-200 sm:px-4 sm:py-3 sm:text-[13px] whitespace-pre break-all select-text"><code>{{ displaySnippet }}</code></pre>
        </div>
      </div>
  </template>
  <div
    v-else-if="resultError || resultMessage"
    class="rounded-md border px-4 py-3 text-sm"
    :class="resultError ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-200' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200'"
  >
    {{ resultMessage }}
  </div>

  <section v-show="showImageList" class="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 p-3 shadow-sm dark:shadow-none sm:p-5">
    <h2 class="mb-3 border-b border-gray-100 pb-2 text-base font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100 sm:mb-4">{{ t.imageList }}</h2>

    <div class="mb-3 flex min-w-0 flex-wrap items-center justify-end gap-1.5 sm:mb-4 sm:gap-2">
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

    <div v-if="storagePath || configPath" class="mb-3 flex flex-col gap-1.5 text-[11px] sm:mb-4">
      <div v-if="storagePath" class="flex min-w-0 items-center gap-1.5 rounded-md bg-gray-100 px-2 py-1.5 dark:bg-gray-700/60 sm:gap-2 sm:px-2.5">
        <span class="w-8 shrink-0 text-gray-500 dark:text-gray-400 sm:w-10">{{ t.storage }}</span>
        <span :title="storagePath" class="min-w-0 flex-1 truncate font-mono text-gray-700 dark:text-gray-300">{{ storagePath }}</span>
        <button type="button" class="shrink-0 rounded px-2 py-0.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-200 transition-colors" :title="t.copyStoragePath" @click="copyPath(storagePath, 'storage')">
          <span v-if="pathCopied === 'storage'">{{ t.copied }}</span>
          <span v-else>{{ t.copy }}</span>
        </button>
      </div>
      <div v-if="configPath" class="flex min-w-0 items-center gap-1.5 rounded-md bg-gray-100 px-2 py-1.5 dark:bg-gray-700/60 sm:gap-2 sm:px-2.5">
        <span class="w-8 shrink-0 text-gray-500 dark:text-gray-400 sm:w-10">{{ t.config }}</span>
        <span :title="configPath" class="min-w-0 flex-1 truncate font-mono text-gray-700 dark:text-gray-300">{{ configPath }}</span>
        <button type="button" class="shrink-0 rounded px-2 py-0.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-200 transition-colors" :title="t.copyConfigPath" @click="copyPath(configPath, 'config')">
          <span v-if="pathCopied === 'config'">{{ t.copied }}</span>
          <span v-else>{{ t.copy }}</span>
        </button>
      </div>
    </div>

    <!-- 列表区域 -->
    <div class="max-h-[360px] overflow-auto rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 sm:max-h-[520px]">
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
            class="group flex min-w-0 flex-wrap items-center gap-2 rounded-md border border-transparent px-2 py-2 transition-colors hover:bg-white hover:border-gray-200 dark:hover:bg-gray-800/60 dark:hover:border-gray-600 sm:gap-3 sm:px-3 sm:py-2.5"
          >
            <div class="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200 dark:border-gray-600 bg-gray-100 text-xs font-medium text-gray-400 dark:bg-gray-700 dark:text-gray-500 sm:h-11 sm:w-11">
              <img
                v-if="img.url"
                :src="img.url"
                alt=""
                class="relative z-[1] h-full w-full object-cover"
                @error="$event.target.style.display='none'"
              />
              <span class="absolute inset-0 z-0 flex items-center justify-center font-medium">{{ index + 1 }}</span>
            </div>
            <div class="min-w-0 flex-1 basis-0">
              <div class="truncate text-xs text-gray-800 dark:text-gray-200 sm:text-[13px]" :title="img.path">
                <span class="mr-1 shrink-0 text-gray-400 dark:text-gray-500">#{{ index + 1 }}</span>
                <span class="truncate">{{ img.path }}</span>
              </div>
              <div class="mt-0.5 hidden text-[10px] text-gray-500 dark:text-gray-400 sm:block sm:text-[11px]">
                {{ t.size }}: {{ formatSize(img.size) }}
              </div>
            </div>
            <div class="flex shrink-0 flex-wrap gap-1 sm:gap-1.5">
              <button
                type="button"
                class="rounded-md border border-gray-300 dark:border-gray-600 bg-white px-1.5 py-0.5 text-[10px] text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 sm:px-2 sm:py-1 sm:text-[11px]"
                @click="openImage(img.url)"
              >
                {{ t.open }}
              </button>
              <button
                type="button"
                class="rounded-md border border-gray-300 dark:border-gray-600 bg-white px-1.5 py-0.5 text-[10px] text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 sm:px-2 sm:py-1 sm:text-[11px]"
                @click="copyLink(img)"
              >
                <span v-if="img._copied">{{ t.copied }}</span>
                <span v-else>{{ t.copyLink }}</span>
              </button>
              <button
                type="button"
                class="rounded-md border border-red-200 dark:border-red-800 px-1.5 py-0.5 text-[10px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 sm:px-2 sm:py-1 sm:text-[11px]"
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
