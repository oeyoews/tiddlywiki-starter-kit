/*\
title: $:/plugins/oeyoews/vue-gemini/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const { GoogleGenerativeAI } = require('./lib/gemini.min.js');
const getText = (title) => $tw.wiki.getTiddlerText(title);
const API_KEY = $tw.wiki.getTiddler('$:/plugins/oeyoews/vue-gemini/config')
  .fields.api;

const app = (title = '') => {
  const component = {
    setup() {
      const res = ref('');

      return {
        API_KEY,
        res,
        text: getText(title),
      };
    },

    mounted() {
      if (!API_KEY) {
        console.error('请填写你的 gemini API_KEY');
        return;
      }
      this.aibot();
    },

    methods: {
      async aibot() {
        const summary = $tw.wiki.getTiddler(title).fields?.summary;
        if (summary) {
          this.res = summary;
          return;
        }
        const genAI = new GoogleGenerativeAI(this.API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const chat = model.startChat({
          history: [
            // {
            //   role: 'user',
            //   parts: [{ text: this.text }],
            // },
            // {
            //   role: 'model',
            //   parts: [{ text: 'Nice to Meet you' }],
            // },
          ],
          generationConfig: {
            maxOutputTokens: 100,
          },
        });

        const msg = this.text + '简短总结一下这段话';

        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const newsummary = response.text();
        $tw.wiki.setText(title, 'summary', null, newsummary);
        this.res = newsummary;
      },
    },

    template: getTemplate('$:/plugins/oeyoews/vue-gemini/templates/app.vue'),

    components: {},
  };
  return component;
};

module.exports = app;
