/*\
title: $:/plugins/oeyoews/vue-gemini/app.js
type: application/javascript
module-type: library

\*/

const { computed, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const { GoogleGenerativeAI } = require('./lib/gemini.min.js');
const getText = (title) => $tw.wiki.getTiddlerText(title);
const API_KEY = $tw.wiki.getTiddler('$:/plugins/oeyoews/vue-gemini/config')
  .fields.api;

const app = (title = '') => {
  const summary = $tw.wiki.getTiddler(title).fields?.summary;
  const component = {
    setup() {
      const res = ref('');
      const isLoading = ref(true);
      const tip = ref('AI 生成的摘要');

      const resHTML = computed(() => {
        return $tw.wiki.renderText('text/html', 'text/markdown', res.value, {
          parseAsInline: true,
        });
      });

      return {
        resHTML,
        API_KEY,
        res,
        tip,
        isLoading,
        text: getText(title),
      };
    },

    mounted() {
      if (summary) {
        this.typewritter(summary);
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
      typewritter(summary) {
        const length = summary.length;
        let index = 0;
        const intervalId = setInterval(() => {
          if (index < length) {
            const text = summary.substring(0, index + 1);
            this.res = text + ' ⬤';
            index++;
          } else {
            this.res = summary;
            clearInterval(intervalId);
          }
        }, 50); // 控制打字速度
      },
      async aibot() {
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

        const msg = this.text + ' \n简短总结上面这段话';

        try {
          const result = await chat.sendMessageStream(msg);
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            this.res += chunkText;
            // 由于vue 更新队列是异步的， 所以不会有打字机效果
            // for (const char of chunkText) {
            //   this.res += char;
            //   console.log(this.res);
            // }
          }
          this.res &&
            $tw.wiki.setText(title, 'summary', null, this.res, {
              suppressTimestamp: true,
            });
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
