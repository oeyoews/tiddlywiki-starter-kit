/*\
title: $:/plugins/oeyoews/vue-zhipu/app.js
type: application/javascript
module-type: library

\*/

const { computed, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');

if (!crypto.subtle) {
  alert(`file:// or unsafe http:// is not allowed to use "crypto.subtle" functions,\n
        you could run this file by Vite3 within the public dir.\n
        file:// 或 不安全的 http:// 无法支持 "crypto.subtle" 方法运行，\n
        把这个文件放到 Vite3 项目的 public 目录中可以运行。
      `);
}

const const_body_str = {
  model: 'glm-3-turbo',
  stream: true,

  // 缓存问题
  messages: [
    {
      role: 'user',
      content: '你知道tiddlywiki 的一切， 请为我简短介绍一下它',
    },
  ],
};

const app = () => {
  const component = {
    setup() {
      const the_last_message = ref('这里是api返回的文本。');
      const api_key = ref('');
      const post_boby = ref(JSON.stringify(const_body_str));
      // 01 - jwtSign 方法：独立方法，可以用来生成JWT签名。（智谱AI 需要的请求头中的 Authorization 字段）
      const jwtSign = async function (secret, payload, my_header) {
        const header = my_header || { alg: 'HS256', sign_type: 'SIGN' };
        const encodedHeader = btoa(JSON.stringify(header));
        const encodedPayload = btoa(JSON.stringify(payload));

        if (!secret) {
          console.log('secret is empty, returned.');
          return;
        }

        // load secret
        const key = await crypto.subtle.importKey(
          'raw',
          new TextEncoder().encode(secret),
          { name: 'HMAC', hash: { name: 'SHA-256' } },
          false,
          ['sign'],
        );

        // sing
        const signature = await crypto.subtle.sign(
          'HMAC',
          key,
          new TextEncoder().encode(encodedHeader + '.' + encodedPayload),
        );

        // ArrayBuffer to Base64
        const encodedSignature = btoa(
          String.fromCharCode.apply(null, new Uint8Array(signature)),
        );
        return encodedHeader + '.' + encodedPayload + '.' + encodedSignature;
      };

      // 02 - fetchTalk 方法：独立方法，就是fetch，用于读原始返回流数据块。（像 openai、智谱，都支持 stream 流数据）
      const fetchTalk = async (post_headers, post_body, callback_on_stream) => {
        let res = await fetch(
          'https://open.bigmodel.cn/api/paas/v4/chat/completions',
          {
            method: 'post',
            headers: post_headers,
            body:
              typeof post_body === 'object'
                ? JSON.stringify(post_body)
                : post_boby,
          },
        );

        // handle stream data
        const reader = res.body.getReader();
        let buffer = '';

        const fn_handelStream = async (reader) => {
          const res_stream = await reader.read();

          if (res_stream.done) {
            // console.log('Stream closed');
            return;
          } else {
            buffer += new TextDecoder('utf-8').decode(res_stream.value);
            const lines = buffer.split('\n\n');
            buffer = lines.pop();

            for (let i in lines) {
              const line = lines[i];

              // console.log(line);
              if (callback_on_stream) {
                callback_on_stream(line);
              }
            }
            return fn_handelStream(reader);
          }
        };
        // 可选 -> await fn_handelStream(reader)
        fn_handelStream(reader);
      };

      // 03 - handleStreamChunk 方法：独立方法，用于处理原始流数据块。（一般由页面UI传入，处理最后的UI数据渲染）
      const handleStreamChunk = function (chunk) {
        // 注意：这里的chunk是原始流数据块格式（`data:  ...\n\n`），你需要根据你的具体业务具体处理。
        // console.log(chunk);

        let temp_obj = JSON.parse(
          chunk.replace(/^data: /, '').replace('\n\n$', ''),
        );
        the_last_message.value +=
          (temp_obj.choices || [{}])[0]?.delta?.content || '';
      };

      // UI-on-click
      const btnClicked = async () => {
        if (api_key.value === '') {
          alert('please set api_key.\n填写api_key');
          return;
        }

        the_last_message.value = '';

        // 01 调用jwtSign方法，获取jwt签名
        let [id, secret] = api_key.value.split('.');
        let st = new Date().valueOf();
        let res_auth_token = await jwtSign(secret, {
          api_key: id,
          timestamp: st,
          exp: new Date(st + 1000 * 60 * 60).valueOf(),
        });
        // console.log('01 res_auth_token: ' + res_auth_token);

        // 02 调用 fetchTalk 方法，获取读取api数据
        let my_headers = {
          Authorization: res_auth_token,
          'content-type': 'application/json',
        };
        let my_body = JSON.parse(post_boby.value);
        fetchTalk(my_headers, my_body, handleStreamChunk);
      };
      const the_last_message_html = computed(() =>
        $tw.wiki.renderText(
          'text/html',
          'text/markdown',
          the_last_message.value,
          {
            parseAsInline: true,
          },
        ),
      );

      return {
        the_last_message,
        the_last_message_html,
        api_key,
        post_boby,
        btnClicked,
      };
    },

    template: getTemplate('$:/plugins/oeyoews/vue-zhipu/templates/app.vue'),
  };
  return component;
};

module.exports = app;
