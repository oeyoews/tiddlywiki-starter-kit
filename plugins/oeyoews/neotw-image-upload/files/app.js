/*\
title: $:/plugins/oeyoews/neotw-image-upload/app.js
type: application/javascript
module-type: library

\*/

// const { ref } = window.Vue;

// 等价于 const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const getTemplate = require('../neotw-vue3/getTemplate.js');
const pluginTitle = '$:/plugins/oeyoews/neotw-image-upload';
const DEFAULT_API_BASE = 'http://localhost:48083/api/v1';
const FORMAT_TIDDLER = `${pluginTitle}/format`;
const API_BASE_TIDDLER = `${pluginTitle}/api-base`;
const LANG_TIDDLER = `${pluginTitle}/lang`;

/** 解包 go-image-server 统一响应 { code, message, data } */
function unwrapApiResponse(data) {
  return { payload: data?.data, errorMessage: data?.message };
}

const i18n = {
  en: {
    uploadTitle: 'Image Upload',
    dropHint: 'Click, drag or Ctrl+V to paste image here',
    size: 'Size',
    fileName: 'File name',
    fileNamePlaceholder: 'Filename (optional extension)',
    pasteHint: 'This area supports Ctrl+V to paste images',
    imageList: 'Image list',
    hideList: 'Hide list',
    upload: 'Upload',
    uploading: 'Uploading...',
    link: 'Link',
    copy: 'Copy',
    copied: 'Copied',
    refresh: 'Refresh',
    loading: 'Loading...',
    storage: 'Storage',
    config: 'Config',
    copyStoragePath: 'Copy storage path',
    copyConfigPath: 'Copy config path',
    noImages: 'No images',
    noImagesHint: 'Drag image in the upload area above or use Ctrl+V to paste',
    open: 'Open',
    copyLink: 'Copy link',
    delete: 'Delete',
    showImageList: 'Show image list',
    hideImageList: 'Hide image list',
    preview: 'Preview',
    deleteConfirm: 'Delete this image?',
    deleteFail: 'Delete failed',
    loadFail: 'Load failed',
  },
  zh: {
    uploadTitle: '图片上传',
    dropHint: '点击、拖拽或 Ctrl+V 粘贴图片到此处',
    size: '大小',
    fileName: '文件名称',
    fileNamePlaceholder: '文件名（可含扩展名）',
    pasteHint: '本区域支持 Ctrl+V 粘贴图片',
    imageList: '图片列表',
    hideList: '隐藏列表',
    upload: '上传',
    uploading: '上传中...',
    link: '链接',
    copy: '复制',
    copied: '已复制',
    refresh: '刷新',
    loading: '加载中...',
    storage: '存储',
    config: '配置',
    copyStoragePath: '复制存储路径',
    copyConfigPath: '复制配置路径',
    noImages: '暂无图片',
    noImagesHint: '可在上方上传区拖拽图片，或使用 Ctrl+V 粘贴上传',
    open: '打开',
    copyLink: '复制链接',
    delete: '删除',
    showImageList: '显示图片列表',
    hideImageList: '隐藏图片列表',
    preview: '预览',
    deleteConfirm: '确定删除这张图片吗？',
    deleteFail: '删除失败',
    loadFail: '加载失败',
  },
};

const app = () => {
  const component = {
    template: getTemplate(`${pluginTitle}/templates/app.vue`),
    data() {
      return {
        lang: 'en',
        file: null,
        previewUrl: '',
        hintText: 'Click, drag or paste image here',
        selectedFileName: '',
        uploadFileName: '',
        isDragover: false,
        uploading: false,
        resultUrl: '',
        resultMessage: '',
        resultError: false,
        resultCopied: '',
        selectedFormat: 'md',
        apiBase: DEFAULT_API_BASE,
        imageGroups: [],
        imagesLoading: false,
        imagesError: '',
        dateFilter: '',
        showImageList: false,
        storagePath: '',
        configPath: '',
        pathCopied: '', // 'storage' | 'config' | ''
      };
    },
    mounted() {
      const today = new Date().toISOString().slice(0, 10);
      this.dateFilter = today;
      this.loadFormatPreference();
      this.loadApiBasePreference();
      this.loadLangPreference();
      this.loadImages();
      this.loadServerInfo();
    },

    computed: {
      t() {
        return i18n[this.lang] || i18n.en;
      },
      markdownSnippet() {
        if (!this.resultUrl) return '';
        return `![](${this.resultUrl})`;
      },
      wikitextSnippet() {
        if (!this.resultUrl) return '';
        return `[img[image|${this.resultUrl}]]`;
      },
      vanillaSnippet() {
        return this.resultUrl || '';
      },
      formatLabel() {
        if (this.selectedFormat === 'md') return 'Markdown';
        if (this.selectedFormat === 'tw') return 'Wikitext';
        if (this.selectedFormat === 'link') return this.t.link;
        return '';
      },
      /** 根据当前复制格式动态显示的链接内容 */
      displaySnippet() {
        if (!this.resultUrl) return '';
        if (this.selectedFormat === 'md') return this.markdownSnippet;
        if (this.selectedFormat === 'tw') return this.wikitextSnippet;
        return this.vanillaSnippet;
      },
    },

    beforeUnmount() {
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl);
      }
    },

    methods: {
      resetPreview() {
        if (this.previewUrl) {
          URL.revokeObjectURL(this.previewUrl);
        }
        this.file = null;
        this.previewUrl = '';
        this.selectedFileName = '';
        this.uploadFileName = '';
        this.hintText = this.t.dropHint;
      },

      /** 上传时使用的文件名：用户可改，扩展名与原文件一致 */
      getUploadFilename() {
        const raw = (this.uploadFileName || '').trim();
        const origName = this.file && this.file.name ? this.file.name : '';
        if (!origName) return origName;
        const origExt = origName.includes('.') ? origName.slice(origName.lastIndexOf('.')) : '';
        if (!raw) return origName;
        const base = raw.includes('.') ? raw.slice(0, raw.lastIndexOf('.')) : raw;
        return base ? base + origExt : origName;
      },

      onFileChange(event) {
        const files = event?.target?.files;
        const file = files && files[0];
        if (!file) {
          this.resetPreview();
          return;
        }
        if (this.previewUrl) {
          URL.revokeObjectURL(this.previewUrl);
        }
        this.file = file;
        this.selectedFileName = file.name;
        this.uploadFileName = '';
        this.hintText = file.name;
        this.previewUrl = URL.createObjectURL(file);
      },

      onDragOver() {
        this.isDragover = true;
      },

      onDragLeave() {
        this.isDragover = false;
      },

      onDrop(event) {
        this.isDragover = false;
        const files = event?.dataTransfer?.files;
        const file = files && files[0];
        if (!file) {
          return;
        }
        if (this.previewUrl) {
          URL.revokeObjectURL(this.previewUrl);
        }
        this.file = file;
        this.selectedFileName = file.name;
        this.uploadFileName = '';
        this.hintText = file.name;
        this.previewUrl = URL.createObjectURL(file);
      },

      onPaste(event) {
        const items = event?.clipboardData?.items;
        if (!items || !items.length) return;

        let file = null;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.kind === 'file' && item.type && item.type.indexOf('image/') === 0) {
            file = item.getAsFile();
            break;
          }
        }

        if (!file) return;

        if (this.previewUrl) {
          URL.revokeObjectURL(this.previewUrl);
        }
        this.file = file;
        this.selectedFileName = file.name || '粘贴的图片';
        this.uploadFileName = '';
        this.hintText = this.selectedFileName;
        this.previewUrl = URL.createObjectURL(file);
      },

      async handleUpload() {
        if (!this.file || this.uploading) return;

        this.uploading = true;
        this.resultMessage = '';
        this.resultError = false;
        this.resultUrl = '';

        const fd = new FormData();
        const saveAsName = this.getUploadFilename();
        fd.append('file', this.file, saveAsName);
        if (saveAsName !== this.file.name) {
          fd.append('filename', saveAsName);
        }

        try {
          const res = await fetch(`${this.apiBase}/upload`, {
            method: 'POST',
            body: fd,
          });
          const raw = await res.json();
          const { payload, errorMessage } = unwrapApiResponse(raw);

          if (res.ok) {
            this.resultError = false;
            this.resultUrl = (payload && payload.url) || '';
            this.resultMessage = this.resultUrl ? '' : '上传成功，但未返回链接';
            if (this.resultUrl) {
              // 上传成功后，按当前选择的格式自动复制到剪贴板
              this.copySnippet(this.selectedFormat);
            }
            await this.loadImages();
          } else {
            this.resultError = true;
            this.resultMessage = errorMessage || '上传失败';
          }
        } catch (err) {
          this.resultError = true;
          this.resultMessage = '请求失败: ' + err.message;
        } finally {
          this.uploading = false;
        }
      },

      async loadServerInfo() {
        try {
          const res = await fetch(`${this.apiBase}/info`);
          if (!res.ok) return;
          const raw = await res.json();
          const { payload } = unwrapApiResponse(raw);
          this.storagePath = (payload && payload.upload_dir) || '';
          this.configPath = (payload && payload.config_file) || '';
        } catch (e) {
          this.storagePath = '';
          this.configPath = '';
        }
      },

      async loadImages() {
        this.imagesLoading = true;
        this.imagesError = '';

        const params = new URLSearchParams();
        if (this.dateFilter) {
          params.set('date', this.dateFilter);
        }
        const qs = params.toString();
        const url = `${this.apiBase}/images` + (qs ? `?${qs}` : '');

        try {
          const res = await fetch(url);
          if (!res.ok) {
            this.imagesError = this.t.loadFail + ': ' + res.status;
            this.imageGroups = [];
            return;
          }
          const raw = await res.json();
          const { payload } = unwrapApiResponse(raw);
          this.imageGroups = Array.isArray(payload) ? payload : [];
        } catch (e) {
          this.imagesError = this.t.loadFail + ': ' + e.message;
          this.imageGroups = [];
        } finally {
          this.imagesLoading = false;
        }
      },

      formatSize(size) {
        const KB = 1024;
        const MB = 1024 * KB;
        const GB = 1024 * MB;
        if (size >= GB) return (size / GB).toFixed(2) + ' GB';
        if (size >= MB) return (size / MB).toFixed(2) + ' MB';
        if (size >= KB) return (size / KB).toFixed(2) + ' KB';
        return size + ' B';
      },

      openImage(url) {
        if (!url) return;
        window.open(url, '_blank');
      },

      loadFormatPreference() {
        try {
          if (typeof $tw === 'undefined' || !$tw.wiki || !$tw.wiki.getTiddlerText) return;
          const value = $tw.wiki.getTiddlerText(FORMAT_TIDDLER);
          if (value === 'md' || value === 'tw' || value === 'link') {
            this.selectedFormat = value;
          }
        } catch (e) {
          // 忽略首选项读取失败
        }
      },

      loadApiBasePreference() {
        try {
          if (typeof $tw === 'undefined' || !$tw.wiki) return;
          let text = $tw.wiki.getTiddlerText(API_BASE_TIDDLER);
          if (text != null && typeof text === 'string' && text.trim()) {
            this.apiBase = text.trim().replace(/\/$/, '');
          } else if ($tw.wiki.getTiddler && !$tw.wiki.getTiddler(API_BASE_TIDDLER) && $tw.wiki.setText) {
            // 无配置时创建默认 tiddler，便于在 wiki 中编辑
            $tw.wiki.setText(API_BASE_TIDDLER, 'text', undefined, DEFAULT_API_BASE);
          }
        } catch (e) {
          // 忽略
        }
      },

      saveFormatPreference() {
        try {
          if (typeof $tw === 'undefined' || !$tw.wiki || !$tw.wiki.setText) return;
          $tw.wiki.setText(FORMAT_TIDDLER, 'text', undefined, this.selectedFormat);
        } catch (e) {
          // 忽略首选项写入失败
        }
      },

      loadLangPreference() {
        try {
          if (typeof $tw === 'undefined' || !$tw.wiki || !$tw.wiki.getTiddlerText) return;
          const value = $tw.wiki.getTiddlerText(LANG_TIDDLER);
          if (value === 'en' || value === 'zh') {
            this.lang = value;
          }
        } catch (e) {
          // 忽略
        }
      },

      saveLangPreference() {
        try {
          if (typeof $tw === 'undefined' || !$tw.wiki || !$tw.wiki.setText) return;
          $tw.wiki.setText(LANG_TIDDLER, 'text', undefined, this.lang);
        } catch (e) {
          // 忽略
        }
      },

      setLang(l) {
        this.lang = l;
        this.saveLangPreference();
      },

      /** 复制到剪贴板：优先 Clipboard API，失败时回退到 execCommand（适配 file:// 等非安全上下文） */
      async copyToClipboard(text) {
        if (!text || typeof text !== 'string') return false;
        try {
          if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            await navigator.clipboard.writeText(text);
            return true;
          }
        } catch (e) {
          // 非安全上下文或权限被拒时继续尝试 fallback
        }
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        textarea.setAttribute('readonly', '');
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, text.length);
        let ok = false;
        try {
          ok = document.execCommand('copy');
        } catch (e) {
          console.error('复制失败', e);
        }
        document.body.removeChild(textarea);
        return ok;
      },

      async copySnippet(kind) {
        if (!this.resultUrl) return;
        let text = '';
        if (kind === 'md') text = this.markdownSnippet;
        else if (kind === 'tw') text = this.wikitextSnippet;
        else if (kind === 'link') text = this.vanillaSnippet;
        if (!text) return;
        const ok = await this.copyToClipboard(text);
        if (ok) {
          this.resultCopied = kind;
          setTimeout(() => { this.resultCopied = ''; }, 1500);
        }
      },

      async copyPath(path, kind) {
        if (!path) return;
        const ok = await this.copyToClipboard(path);
        if (ok) {
          this.pathCopied = kind;
          setTimeout(() => { this.pathCopied = ''; }, 1500);
        }
      },

      async copyLink(img) {
        const url = img && img.url;
        if (!url) return;
        let text = '';
        if (this.selectedFormat === 'md') {
          text = `![](${url})`;
        } else if (this.selectedFormat === 'tw') {
          text = `[img[image|${url}]]`;
        } else {
          text = url;
        }
        const ok = await this.copyToClipboard(text);
        if (ok) {
          img._copied = true;
          setTimeout(() => { img._copied = false; }, 1500);
        }
      },

      async deleteImage(img) {
        if (!img || !img.path) return;
        const ok = window.confirm(this.t.deleteConfirm + '\n' + img.path);
        if (!ok) return;

        const url = `${this.apiBase}/images?path=${encodeURIComponent(img.path)}`;
        try {
          const res = await fetch(url, { method: 'DELETE' });
          if (!res.ok) {
            let raw = {};
            try {
              raw = await res.json();
            } catch (e) {
              // ignore
            }
            const { errorMessage } = unwrapApiResponse(raw);
            window.alert(this.t.deleteFail + ': ' + (errorMessage || res.status));
            return;
          }
          await this.loadImages();
        } catch (e) {
          window.alert(this.t.deleteFail + ': ' + e.message);
        }
      },
    },
  };
  return component;
};

module.exports = app;
