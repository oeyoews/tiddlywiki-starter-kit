/*\
title: $:/plugins/oeyoews/vue-gemini/daily/app.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const { GoogleGenerativeAI } = require('../lib/gemini.min.js');
const API_KEY = $tw.wiki.getTiddler('$:/plugins/oeyoews/vue-gemini/config')
  .fields.api;

const app = (title) => {
  const component = {
    setup() {
      const res = ref('');
      const isLoading = ref(true);
      const tip = ref('每日一句');
      return {
        tip,
        API_KEY,
        res,
        isLoading,
        text: '',
      };
    },

    mounted() {
      const quote = $tw.wiki.getTiddler(title).fields?.quote;
      if (quote) {
        this.res = quote;
        this.isLoading = false;
        return;
      }
      if (!API_KEY) {
        console.error('请填写你的 gemini API_KEY');
        this.isLoading = false;
        this.res = '请填写你的 gemini API_KEY';
        return;
      }
      this.aibot();
    },

    methods: {
      async aibot() {
        const genAI = new GoogleGenerativeAI(this.API_KEY);
        const generationConfig = {
          //   stopSequences: ['red'],
          maxOutputTokens: 200,
          temperature: 0.5,
          topP: 0.1,
          topK: 16,
        };
        const model = genAI.getGenerativeModel({
          model: 'gemini-pro',
          generationConfig,
        });

        const chat = model.startChat({
          history: [],
          generationConfig: {
            maxOutputTokens: 100,
          },
        });

        const msg = '每日一句, 类型为幽默';
        try {
          const result = await chat.sendMessage(msg);
          const response = await result.response;
          const quote = response.text();
          $tw.wiki.setText(title, 'quote', null, quote, {
            suppressTimestamp: true,
          });
          this.res = quote;
          // 如果输出为空， 显示重新生成按钮
        } catch (e) {
          console.error(e);
          this.res = e;
        }
        this.isLoading = false;
      },
    },

    template: getTemplate('$:/plugins/oeyoews/vue-gemini/templates/app.vue'),

    components: {},
  };
  return component;
};

module.exports = app;
