// /** @type {import ('./types.d.mjs').ConfigOptions} */
/** @type {import ('./types').ConfigOptions} */
export default {
  name: 'tiddlywiki-starter-kit', // 配置项的名称
  description:
    'A modern style and elegant notebook built with Tiddlywiki5 and Tailwindcss', // 配置项的描述
  server: {
    port: 8000, // 服务器监听的端口号
    host: false, // 是否启用主机模式
    hostname: '0.0.0.0', // 主机名
    qrcode: true, // 是否显示二维码
    zen: false, // 是否启用zen模式
    open: false, // 是否在启动时打开浏览器
  },
  auth: false,
  username: 'oeyoews', // 用户名
  password: 'oeyoews', // 密码
  output: '.tiddlywiki', // 输出目录
  wiki: 'src', // 维基库目录
  markdown: true, // 是否启用Markdown渲染
  tiddlersRepo: 'oeyoews/neotw-tiddlers', // 存储Tiddler的仓库
  pluginversion: '5.3.0', // 插件版本
  checkfilesize: false, // 是否检查文件大小
};
