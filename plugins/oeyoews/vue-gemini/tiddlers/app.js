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
const { API_KEY, speed, icon } = require('./config.js');

const app = (title = '', text = '', tip = 'AI 生成的摘要') => {
  const summary = text || $tw.wiki.getTiddler(title).fields?.summary;
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
        prompt,
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
        const prompt = this.text + ' \n简短总结上面这段话';
        try {
          this.res = await geminiChat({
            API_KEY,
            prompt,
          });

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
