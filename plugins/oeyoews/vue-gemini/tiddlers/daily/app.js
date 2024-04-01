/*\
title: $:/plugins/oeyoews/vue-gemini/daily/app.js
type: application/javascript
module-type: library

每日一句
\*/

const { computed, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const { gemini: geminiChat, spark: sparkChat } = require('../model/index');

const {
  API_KEY,
  speed,
  icon,
  SPARK_APP_ID,
  SPARK_API_KEY,
  SPARK_API_SECRET,
  model: MODEL,
} = require('../config.js');

const app = (title, prompt = '每日一句, 类型为幽默', model) => {
  const quote = $tw.wiki.getTiddler(title).fields?.quote;
  const component = {
    setup() {
      const res = ref('');
      const isLoading = ref(true);
      const tip = ref('每日一句');

      const resHTML = computed(() => {
        return $tw.wiki.renderText('text/html', 'text/markdown', res.value, {
          parseAsInline: true,
        });
      });

      return {
        resHTML,
        tip,
        API_KEY,
        res,
        isLoading,
        text: '',
      };
    },

    mounted() {
      if (quote) {
        this.typewritter(quote);
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
      typewritter(quote) {
        const length = quote.length;
        let index = 0;
        const intervalId = setInterval(() => {
          if (index < length) {
            const text = quote.substring(0, index + 1);
            this.res = text + ' ' + icon;
            index++;
          } else {
            this.res = quote;
            clearInterval(intervalId);
          }
        }, speed); // 控制打字速度
      },
      async aibot() {
        try {
          // const result = await geminiChat(this.API_KEY).sendMessage(prompt);
          // const response = await result.response;
          // const quote = response.text();
          switch (model || MODEL) {
            case 'spark':
              if (!SPARK_API_KEY) {
                throw Error('没有填写 SPARK_API_KEY');
              }
              this.res = await sparkChat({
                prompt,
                API_KEY: SPARK_API_KEY,
                APP_ID: SPARK_APP_ID,
                API_SECRET: SPARK_API_SECRET,
              });
              break;
            default:
              this.res = await geminiChat({
                prompt,
                API_KEY,
              });
              break;
          }

          this.res &&
            $tw.wiki.setText(title, 'quote', null, this.res, {
              suppressTimestamp: true,
            });
          // 如果输出为空， 显示重新生成按钮
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
