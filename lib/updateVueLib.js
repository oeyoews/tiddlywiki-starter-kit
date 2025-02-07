import fs from 'fs';
import path from 'path';
import { Transform, pipeline } from 'stream';
import { promisify } from 'util';

const pluginInfoPath = 'plugins/oeyoews/neotw-vue3/plugin.info';
const pluginInfoContent = JSON.parse(
  fs.readFileSync(path.resolve(pluginInfoPath)),
);
const oldLibVersion = pluginInfoContent.version;

// nodejs > 23
async function getLatestTag() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/vuejs/core/tags',
    );
    if (!response.ok) {
      throw new Error(`HTTP error! 状态码: ${response.status}`);
    }
    const tags = await response.json();
    if (tags.length > 0) {
      //   console.log(`最新的标签是: ${tags[0].name}`);
      return tags[0].name.slice(1);
    } else {
      console.log('未找到任何标签。');
    }
  } catch (error) {
    console.error(`获取标签时出错: ${error}`);
  }
}

const tag = await getLatestTag();

if (tag === oldLibVersion) {
  console.info(`当前 Vue.js 生产环境文件已是最新版本${oldLibVersion}`);
  process.exit(0);
} else {
  console.info(
    `当前 Vue.js 生产环境文件不是最新版本${oldLibVersion}，准备开始下载最新版本：${tag}`,
  );
}

// 远程 Vue.js 生产环境文件 URL
const url = `https://unpkg.com/vue@${tag}/dist/vue.global.prod.js`;
// 本地保存路径
const filename = 'vue.global.prod.js';
const outputPath = path.resolve('plugins/oeyoews/neotw-vue3/files', filename);

const streamPipeline = promisify(pipeline);

async function downloadFile(url, outputPath) {
  console.log('开始下载', url);
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP 错误! 状态码: ${response.status}`);
    }

    // 使用 pipeline 处理可读流
    const suffix = 'module.exports=Vue;';
    const fileStream = fs.createWriteStream(outputPath);

    // 用于统计文件大小
    let totalBytes = 0;

    // 创建一个自定义的可读流，用来跟踪下载的字节数
    const countBytesStream = new Transform({
      transform(chunk, encoding, callback) {
        totalBytes += chunk.length; // 累加字节数
        callback(null, chunk);
      },
    });

    await streamPipeline(response.body, countBytesStream, fileStream);

    // 下载完成后，输出文件大小
    console.log(`文件下载成功: ${outputPath}`);
    console.log(`下载的文件大小: ${Math.round(totalBytes / 1024)} kb`);
    fs.appendFileSync(outputPath, suffix); // 适配tiddlywiki, 将后缀添加到文件末尾

    // 更新版本号
    pluginInfoContent.version = tag;
    fs.writeFileSync(
      pluginInfoPath,
      JSON.stringify(pluginInfoContent, null, 2),
    );
  } catch (error) {
    console.error(`文件下载失败: ${error}`);
  }
}

downloadFile(url, outputPath);
