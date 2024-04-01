/*\
title: $:/plugins/oeyoews/vue-gemini/app.js
type: application/javascript
module-type: library

摘要总结
\*/

const { computed, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const {
  HarmBlockThreshold,
  HarmCategory,
  GoogleGenerativeAI,
} = require('./lib/gemini.min.js');
const getText = (title) => $tw.wiki.getTiddlerText(title);
const {
  api: API_KEY,
  icon = '⬤',
  speed = 20,
} = $tw.wiki.getTiddler('$:/plugins/oeyoews/vue-gemini/config').fields;

const app = (title = '', text = '', tip = 'AI 生成的摘要') => {
  const summary = text || $tw.wiki.getTiddler(title).fields?.summary;
  console.log(summary);
  const component = {
    setup() {
      const res = ref('');
      const isLoading = ref(true);

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
            const text = summary.slice(0, index + 1);
            this.res = text + ' ' + icon;
            index++;
          } else {
            this.res = summary;
            clearInterval(intervalId);
          }
        }, speed); // 控制打字速度
      },
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
          // https://github.com/google/generative-ai-docs/issues/212
          // https://ai.google.dev/docs/safety_setting_gemini
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_NONE',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_NONE',
            },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_NONE',
            },
          ],
        });

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
          console.error(e.message);
          this.res = e.message;
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
