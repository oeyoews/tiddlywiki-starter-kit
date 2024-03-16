/*\
title: $:/plugins/oeyoews/neotw-vue-codeblock/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const {
  Notivue,
  Notification,
  push: toast
} = require('$:/plugins/oeyoews/notivue/notivue.js');

const app = (code = 'npx create neotw@latest') => {
  const component = {
    setup() {
      return { code };
    },

    methods: {
      async copyCode() {
        const code = this.$refs.codeRef.textContent.trim();
        if (code && window.navigator.clipboard?.writeText) {
          await window.navigator.clipboard.writeText(code);
        }
        toast.success({
          message: 'Copied to clipboard'
        });
      }
    },

    template: getTemplate(
      '$:/plugins/oeyoews/neotw-vue-codeblock/templates/app.vue'
    ),

    components: {
      Notification,
      Notivue
    }
  };
  return component;
};

module.exports = app;
