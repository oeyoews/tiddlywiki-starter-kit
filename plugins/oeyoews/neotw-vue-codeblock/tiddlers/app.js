/*\
title: $:/plugins/oeyoews/neotw-vue-codeblock/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const { copyToClipboard } = $tw.utils;

const app = (code = 'npx create neotw@latest') => {
  const component = {
    setup() {
      return { code };
    },

    methods: {
      async copyCode() {
        const code = this.$refs.codeRef.textContent.trim();

        copyToClipboard(code, {
          // doNotNotify: false,
          // TIDDler
          // successNotification: '复制成功',
          // failureNotification: '复制失败',
        });

        // if (code && window.navigator.clipboard?.writeText) {
        //   await window.navigator.clipboard.writeText(code);
        // }
        // toast.success({
        //   message: 'Copied to clipboard'
        // });
      },
    },

    template: getTemplate(
      '$:/plugins/oeyoews/neotw-vue-codeblock/templates/app.vue',
    ),

    components: {},
  };
  return component;
};

module.exports = app;
