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
        version: '',
        latestTwVersion: '',
        versions: [],
        file: '',
      };
    },
    mounted() {
      this.getTWLatestVersion().then(() => {
        this.generateRandomVersion();
      });
      this.checkToken(token);
      this.hasToken = this.getChatId();
    },
    methods: {
      handleSuccess(e) {
        this.file = e.raw;
        this.caption = e.name;
        ElNotification({
          title: '成功',
          message: e.name + '文件上传本地成功',
          type: 'success',
        });
      },
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
      // generate random vx.x.x format number version
      generateRandomVersion() {
        function getRandomNumber() {
          return Math.random().toFixed(1).split('.')[1];
        }
        Array(3)
          .fill(0)
          .forEach(() => {
            this.versions.push(
              `v${getRandomNumber()}.${getRandomNumber()}.${getRandomNumber()}`,
            );
          });
        // 随机位置插入
        this.versions.splice(
          Math.floor(Math.random() * this.versions.length),
          0,
          this.latestTwVersion,
        );
      },
      getTWLatestVersion() {
        return new Promise((resolve, reject) => {
          fetch('https://api.github.com/repos/TiddlyWiki/TiddlyWiki5/tags')
            .then((res) => res.json())
            .then((res) => {
              this.latestTwVersion = res[0].name;
              resolve();
            });
        });
      },
      sendPhoto() {
        if (!this.file) {
          return;
        }
        const formData = new FormData();
        formData.append('chat_id', this.chatId);
        formData.append('caption', this.caption);
        formData.append('photo', this.file);
        fetch(this.baseUrl + '/sendPhoto', {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((res) => {
            this.file = '';
            this.caption = '';
            if (res.ok) {
              ElNotification({
                title: '成功',
                message: '图片发送成功',
                type: 'success',
              });
            } else {
              ElNotification({
                type: 'error',
                message: res.description,
                title: '错误',
              });
            }
          })
          .catch((err) => {
            ElNotification({
              type: 'error',
              message: err,
              title: '错误',
            });
          });
      },
      sendMessage() {
        this.sendPhoto();
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
        if (!this.checkEmail(this.email)) {
          ElNotification({
            title: '错误',
            message: 'email 无效',
            type: 'warning',
          });
          return;
        }
        if (this.version !== this.latestTwVersion) {
          ElNotification({
            title: '错误',
            message: '请选择正确的版本号',
            type: 'warning',
          });
          return;
        }
        const data = {
          photo:
            'https://images.unsplash.com/photo-1720048171180-a8178a198fa8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8',
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
