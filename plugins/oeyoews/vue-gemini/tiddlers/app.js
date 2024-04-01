/*\
title: $:/plugins/oeyoews/vue-gemini/app.js
type: application/javascript
module-type: library
description: 摘要总结

\*/

const { computed, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const { gemini: geminiChat, spark: sparkChat } = require('./model/index');
const getText = (title) => $tw.wiki.getTiddlerText(title);

const {
  API_KEY,
  speed,
  icon,
  SPARK_APP_ID,
  SPARK_API_KEY,
  SPARK_API_SECRET,
  model: MODEL,
} = require('./config.js');

const app = (
  title = '',
  text = '',
  tip = 'AI 生成的摘要',
  model,
  targetField = 'summary',
) => {
  const fieldText = text || $tw.wiki.getTiddler(title).fields?.[targetField];
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
      if (fieldText) {
        this.typewritter(fieldText);
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
        let prompt = '';
        switch (targetField) {
          case 'quote':
            prompt = '每日一句, 类型为幽默';
            break;
          default:
            prompt = this.text + ' \n简短总结上面这段话';
            break;
        }
        try {
          if (!this.text) {
            throw Error('没有输入内容');
          }
          switch (model || MODEL) {
            case 'gemini':
              this.res = await geminiChat({
                prompt,
                API_KEY,
              });
              break;
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
              break;
          }

          this.res &&
            $tw.wiki.setText(title, targetField, null, this.res, {
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
