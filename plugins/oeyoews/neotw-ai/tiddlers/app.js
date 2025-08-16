/*\
title: $:/plugins/oeyoews/neotw-ai/app.js
type: application/javascript
module-type: library
description: 摘要总结

\*/

/** @typedef {'gemini'|'spark'|'siliconflow'} IModel */

const { computed, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

const aiModels = require('./model/index');

const getText = (title) => $tw.wiki.getTiddlerText(title);
const { getPrompt } = require('./prompt.js');

const {
  API_KEY,
  speed,
  icon,
  SPARK_APP_ID,
  SPARK_API_KEY,
  SPARK_API_SECRET,
  SILICONFLOW_API_KEY,
  CHATGPT_PROXY_URL,
  CHATGPT_API_KEY,
  GROK_API_KEY,
  GROQ_API_KEY,
  model: MODEL, // 配置的默认model
} = require('./config.js');

const app = (
  title = '',
  text = '',
  tip = 'AI 生成的摘要',
  /** @type {keyof import('./model/index')} */
  model, // widget 参数 手动传递
  targetField = 'summary',
) => {
  const fieldText = text || $tw.wiki.getTiddler(title).fields?.[targetField];
  const component = {
    setup() {
      const res = ref('');
      const isLoading = ref(true);
      const header = ref(tip);

      const resHTML = computed(() => {
        return $tw.wiki.renderText('text/html', 'text/markdown', res.value, {
          parseAsInline: true,
        });
      });
      const online = computed(() => {
        return window.location.protocol === 'https:';
      });
      const prompt = ref('');
      const typing = ref(false);
      const noAi = ref(text ? true : false);

      return {
        online,
        typing,
        noAi,
        prompt,
        resHTML,
        API_KEY,
        res,
        header,
        isLoading,
        text: getText(title),
      };
    },

    mounted() {
      this.init();
    },

    methods: {
      init(regenerate = false) {
        this.check();
        if (fieldText && !regenerate) {
          this.typewritter(fieldText);
          this.isLoading = false;
          return;
        }
        if (!API_KEY) {
          console.error('请填写你的 API_KEY');
          this.isLoading = false;
          this.res = '请填写你的 API_KEY';
          return;
        }
        this.aibot(regenerate);
      },
      regenerate() {
        this.isLoading = true;
        this.init(true);
      },
      typewritter(summary) {
        this.typing = true;
        const length = summary.length;
        let index = 0;
        const intervalId = setInterval(() => {
          if (index < length) {
            const text = summary.slice(0, index + 1);
            this.res = text + ' ' + icon;
            index++;
          } else {
            this.res = summary;
            this.typing = false;
            clearInterval(intervalId);
          }
        }, speed); // 控制打字速度
      },
      check() {
        const fields = ['quote', 'summary'];
        if (!fields.some((item) => item === targetField)) {
          console.error(targetField + '不属于对应的类型');
        }
        // 支持英文输出
        switch (targetField) {
          case 'quote':
            // this.prompt = `请阅读并总结日记，适当使用emoji，使用富有意境和哲理的文人语气，简体中文输出, 输出尽量简洁扼要， 不要换行，不要带有\n, 以下是今日日记。\n ${getText(title)}`;
            this.prompt = getPrompt(getText(title));
            this.header = '流莹';
            break;
          default:
            this.prompt = `请阅读以下文章或句子，并提供一个精准、有意义的总结。总结应涵盖核心信息，避免空洞或无意义的内容, 请确保总结简洁且富有信息量，不要使用泛泛之谈。并且使用简体中文, 仅仅输出文本，可以适当带有一定的emoji,但不要输出代码块等非段落的格式文本,不要换行，不要带有\n, 保证输出的完整性。 以下是需要阅读的文章或者句子。\n ${this.text}`;
            break;
        }
      },
      async aibot(regenerate = false) {
        try {
          if (!this.text) {
            throw Error('没有输入内容');
          }
          if (regenerate) {
            // 尝试重新获取
            model = $tw.wiki.getTiddler('$:/plugins/oeyoews/neotw-ai/config')
              .fields.model;
          }
          if (!model) {
            model = MODEL || 'gemini';
          }

          switch (model) {
            case 'chatgpt':
            case 'ollama':
            case 'siliconflow':
            case 'grok':
            case 'groq':
              if (model === 'chatgpt') {
                if (!CHATGPT_API_KEY) {
                  throw Error('没有填写 CHATGPT_API_KEY');
                }
                if (!CHATGPT_API_KEY.startsWith('sk-')) {
                  throw Error('请填写有效的 apikey');
                }
              }
              if (model === 'siliconflow') {
                if (!SILICONFLOW_API_KEY) {
                  throw Error('没有填写 SILICONFLOW_API_KEY');
                }
                if (!SILICONFLOW_API_KEY.startsWith('sk-')) {
                  throw Error('请填写有效的 apikey');
                }
              }
              let baseurl = 'https://api.openai.com';
              let api_model = '';
              // baseurl = CHATGPT_PROXY_URL || 'https://api.chatanywhere.tech'; // https://github.com/chatanywhere/GPT_API_free?tab=readme-ov-file
              if (CHATGPT_PROXY_URL && model === 'chatgpt') {
                baseurl = CHATGPT_PROXY_URL;
              }
              let apiKey = CHATGPT_API_KEY;
              if (model === 'ollama') {
                baseurl = 'http://localhost:11434';
                api_model = 'qwen2:0.5b';
              }
              if (model === 'siliconflow') {
                baseurl = 'https://api.siliconflow.cn';
                apiKey = SILICONFLOW_API_KEY;
                // 适配模型
                // https://docs.siliconflow.cn/api-reference/chat-completions/chat-completions
                const sf_models = {
                  qw72: 'Qwen/Qwen2.5-72B-Instruct',
                };
                api_model = sf_models.qw72;
              }
              // 收费： https://console.x.ai
              if (model === 'grok') {
                baseurl = 'https://api.x.ai';
                apiKey = GROK_API_KEY;
                api_model = 'grok-2-latest';
              }
              if (model === 'groq') {
                api_model = 'qwen-2.5-32b';
                baseurl = 'https://api.groq.com/openai';
                apiKey = GROQ_API_KEY;
              }
              this.res = await aiModels['chatgpt']({
                baseurl,
                apiKey,
                content: this.prompt,
                model: api_model,
              });
              break;
            case 'gemini':
              let res = await aiModels[model]({
                prompt: this.prompt,
                API_KEY,
              });
              if (res.endsWith('\n')) {
                this.res = res.slice(0, -1);
              }
              break;
            // case 'ollama':
            //   this.res = await aiModels[model]({
            //     content: this.prompt,
            //   });
            //   break;
            case 'spark':
              if (!SPARK_API_KEY) {
                throw Error('没有填写 SPARK_API_KEY');
              }
              this.res = await aiModels[model]({
                prompt: this.prompt,
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

    template: getTemplate('$:/plugins/oeyoews/neotw-ai/templates/app.vue'),

    components: {},
  };
  return component;
};

module.exports = app;
