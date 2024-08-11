/*\
title: $:/plugins/oeyoews/neotw-bot/app.js
type: application/javascript
module-type: library

\*/

const { ElNotification } = require('element-plus.min.js');

// 等价于 const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const getTemplate = require('../neotw-vue3/getTemplate.js');
const pluginTitle = '$:/plugins/oeyoews/neotw-bot';

const app = ({ token }) => {
  const component = {
    components: {},
    template: getTemplate(`${pluginTitle}/templates/app.vue`),
    data() {
      return {
        baseUrl: 'https://api.telegram.org/bot' + token,
        chatId: '',
        username: '',
        email: '',
        text: '',
        hasToken: false,
      };
    },
    mounted() {
      this.checkToken(token);
      this.hasToken = this.getChatId();
    },
    methods: {
      checkToken(token) {
        if (!token) {
          ElNotification({
            title: '错误',
            message: '请输入token',
            type: 'warning',
          });
          return false;
        }
        // 正则表达式匹配格式：一串数字 + 冒号 + 一串大小写字母和数字
        const tokenRegex = /^\d+:[A-Za-z0-9_-]+$/;

        // 先检查格式是否正确
        if (!tokenRegex.test(token)) {
          ElNotification({
            title: '错误',
            message: 'token 无效',
            type: 'warning',
          });
          return false;
        }

        // 分割token成两部分
        const parts = token.split(':');
        const part1 = parts[0]; // 冒号前的部分
        const part2 = parts[1]; // 冒号后的部分

        // 检查两部分的长度
        if (part1.length === 10 && part2.length === 35) {
          return true;
        } else {
          ElNotification({
            title: '错误',
            message: 'token 无效',
            type: 'warning',
          });
          return false;
        }
      },
      checkEmail(email) {
        const emailRegex =
          /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!emailRegex.test(email)) {
          ElNotification({
            title: '错误',
            message: 'email 无效',
            type: 'warning',
          });
          return false;
        }
        return true;
      },
      sendMessage() {
        if (!this.checkEmail(this.email)) {
          ElNotification({
            title: '错误',
            message: 'email 无效',
            type: 'warning',
          });
          return;
        }
        if (!this.checkToken(token)) {
          ElNotification({
            title: '错误',
            message: 'token 无效',
            type: 'warning',
          });
          return;
        }
        if (!this.text || !this.username || !this.email) {
          ElNotification({
            title: '错误',
            message: '请完善表单信息',
            type: 'warning',
          });
          return;
        }
        const data = {
          chat_id: this.chatId,
          text: `username: ${this.username}\nemail: ${this.email}\ncontent: ${this.text}`,
          // parse_mode: 'HTML', // 'MarkdownV2', 仍然有很多语法不支持导致报错
        };

        fetch(this.baseUrl + '/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.ok) {
              this.text = '';
              ElNotification({
                title: '成功',
                message: '发送成功',
                type: 'success',
                duration: 1500,
              });
            } else {
              ElNotification({
                title: '错误(tg-bot)',
                message: res.description,
                type: 'error',
              });
            }
          })
          .catch((err) => {
            ElNotification({
              title: '错误',
              message: err.description,
              type: 'error',
            });
          });
      },
      async getChatId() {
        try {
          const response = await fetch(this.baseUrl + '/getUpdates');
          const result = await response.json();
          this.chatId = result.result[0].my_chat_member.chat.id;
        } catch (err) {
          console.log(err);
        }
      },
    },
  };
  return component;
};

module.exports = app;
