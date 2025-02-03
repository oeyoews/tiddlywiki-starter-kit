import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

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
    await streamPipeline(response.body, fileStream);
    console.log(`文件下载成功: ${outputPath}`);
    fs.appendFileSync(outputPath, suffix);
  } catch (error) {
    console.error(`文件下载失败: ${error}`);
  }
}

downloadFile(url, outputPath);
