/*\
title: $:/plugins/oeyoews/neotw-image-upload/app.js
type: application/javascript
module-type: library

\*/

// const { ref } = window.Vue;

// 等价于 const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const getTemplate = require('../neotw-vue3/getTemplate.js');
const pluginTitle = '$:/plugins/oeyoews/neotw-image-upload';
const API_BASE = 'http://localhost:8096';
const FORMAT_TIDDLER = `${pluginTitle}/format`;

const app = () => {
  const component = {
    template: getTemplate(`${pluginTitle}/templates/app.vue`),
    data() {
      return {
        file: null,
        previewUrl: '',
        hintText: '点击或拖拽图片到此处',
        selectedFileName: '',
        isDragover: false,
        uploading: false,
        resultUrl: '',
        resultMessage: '',
        resultError: false,
        resultCopied: '',
        selectedFormat: 'md',
        imageGroups: [],
        imagesLoading: false,
        imagesError: '',
        dateFilter: '',
      };
    },
    mounted() {
      const today = new Date().toISOString().slice(0, 10);
      this.dateFilter = today;
      this.loadImages();
      this.loadFormatPreference();
    },

    computed: {
      markdownSnippet() {
        if (!this.resultUrl) return '';
        return `![](${this.resultUrl})`;
      },
      wikitextSnippet() {
        if (!this.resultUrl) return '';
        // TiddlyWiki 图片语法：[img[alt|url]]
        return `[img[image|${this.resultUrl}]]`;
      },
      vanillaSnippet() {
        return this.resultUrl || '';
      },
      formatLabel() {
        if (this.selectedFormat === 'md') return 'Markdown';
        if (this.selectedFormat === 'tw') return 'Wikitext';
        if (this.selectedFormat === 'link') return '链接';
        return '';
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
        this.hintText = '点击或拖拽图片到此处';
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
        fd.append('file', this.file);

        try {
          const res = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            body: fd,
          });
          const data = await res.json();

          if (res.ok) {
            this.resultError = false;
            this.resultUrl = data.url || '';
            this.resultMessage = this.resultUrl ? '' : '上传成功，但未返回链接';
            if (this.resultUrl) {
              // 上传成功后，按当前选择的格式自动复制到剪贴板
              this.copySnippet(this.selectedFormat);
            }
            await this.loadImages();
          } else {
            this.resultError = true;
            this.resultMessage = data.error || '上传失败';
          }
        } catch (err) {
          this.resultError = true;
          this.resultMessage = '请求失败: ' + err.message;
        } finally {
          this.uploading = false;
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
        const url = `${API_BASE}/images` + (qs ? `?${qs}` : '');

        try {
          const res = await fetch(url);
          if (!res.ok) {
            this.imagesError = '加载失败：' + res.status;
            this.imageGroups = [];
            return;
          }
          const data = await res.json();
          this.imageGroups = Array.isArray(data) ? data : [];
        } catch (e) {
          this.imagesError = '加载失败：' + e.message;
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

      saveFormatPreference() {
        try {
          if (typeof $tw === 'undefined' || !$tw.wiki || !$tw.wiki.setText) return;
          $tw.wiki.setText(FORMAT_TIDDLER, 'text', undefined, this.selectedFormat);
        } catch (e) {
          // 忽略首选项写入失败
        }
      },

      async copySnippet(kind) {
        if (!this.resultUrl || !navigator.clipboard) return;

        let text = '';
        if (kind === 'md') text = this.markdownSnippet;
        else if (kind === 'tw') text = this.wikitextSnippet;
        else if (kind === 'link') text = this.vanillaSnippet;

        if (!text) return;

        try {
          await navigator.clipboard.writeText(text);
          this.resultCopied = kind;
          setTimeout(() => {
            this.resultCopied = '';
          }, 1500);
        } catch (e) {
          console.error('复制失败', e);
        }
      },

      async copyLink(img) {
        const url = img && img.url;
        if (!url || !navigator.clipboard) {
          return;
        }
        // 根据当前下拉选择的格式生成文本
        let text = '';
        if (this.selectedFormat === 'md') {
          text = `![](${url})`;
        } else if (this.selectedFormat === 'tw') {
          text = `[img[image|${url}]]`;
        } else {
          text = url;
        }

        try {
          await navigator.clipboard.writeText(text);
          // mark copied on this item
          img._copied = true;
          setTimeout(() => {
            img._copied = false;
          }, 1500);
        } catch (e) {
          // 复制失败时，不抛出错误，只在控制台记录
          console.error('复制失败', e);
        }
      },

      async deleteImage(img) {
        if (!img || !img.path) return;
        const ok = window.confirm('确定删除这张图片吗？\n' + img.path);
        if (!ok) return;

        const url = `${API_BASE}/images?path=${encodeURIComponent(img.path)}`;
        try {
          const res = await fetch(url, { method: 'DELETE' });
          if (!res.ok) {
            let data = {};
            try {
              data = await res.json();
            } catch (e) {
              // ignore
            }
            const message = data.error || res.status;
            window.alert('删除失败：' + message);
            return;
          }
          await this.loadImages();
        } catch (e) {
          window.alert('删除失败：' + e.message);
        }
      },
    },
  };
  return component;
};

module.exports = app;
