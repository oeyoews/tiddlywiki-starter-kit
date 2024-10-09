/*\
title: $:/plugins/oeyoews/vue-copy/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;
const clipboardTiddler = '$:/temp/oeyoews/clipboard';
const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const Version = require('./components/Version');

const app = () => {
  const component = {
    setup() {
      const clipboardContent = ref('');
      const html = ref('');
      const title = ref('');

      // watch(title, (newVal) => { })

      return {
        ref,
        html,
        title,
        clipboardContent,
      };
    },

    methods: {
      clean() {
        this.html = '';
        $tw.wiki.deleteTiddler(clipboardTiddler);
        this.clipboardContent = '';
      },
      importTiddler() {
        $tw.rootWidget.dispatchEvent({
          type: 'tm-navigate',
          navigateTo: clipboardTiddler,
        });

        new $tw.Story().navigateTiddler(clipboardTiddler);
      },
      fetchClipboard() {
        if (!navigator.clipboard?.readText) {
          console.error('当前浏览器不支持读取粘贴板内容');
          return;
        }
        navigator.clipboard
          .readText()
          .then((clipText) => {
            if (!clipText.trim()) return;
            if (clipText === this.clipboardContent) return;

            $tw.wiki.setText(clipboardTiddler, 'text', null, clipText);

            this.clipboardContent = clipText;
            this.html = $tw.wiki.renderTiddler('text/html', clipboardTiddler);
          })

          .catch((error) => {
            console.error('读取粘贴板内容时出错：', error.message);
          });
      },
    },

    template: getTemplate('$:/plugins/oeyoews/vue-copy/templates/app.vue'),

    components: {
      Version,
    },
  };
  return component;
};

module.exports = app;
