import fs from 'fs';
import path from 'path';
import { Transform, pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);
// 本地保存路径
const filename = 'tailwindcss-v4.min.js';
const outputPath = path.resolve(
  'plugins/oeyoews/tiddlywiki-tailwindcss-v4/files',
  filename,
);

/* 下载最新的 twcss 生产环境文件() */

const pluginInfoPath = 'plugins/oeyoews/tiddlywiki-tailwindcss-v4/plugin.info';
const pluginInfoContent = JSON.parse(
  fs.readFileSync(path.resolve(pluginInfoPath)),
);
const oldLibVersion = pluginInfoContent.version;

async function getLatestTag() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/tailwindlabs/tailwindcss/tags',
    );
    if (!response.ok) {
      throw new Error(`HTTP error! 状态码: ${response.status}`);
    }
    const tags = await response.json();
    // 过滤掉包含 pre-release 标记的 tag
    const stableTag = tags.find((tag) => {
      const name = tag.name.toLowerCase();
      return (
        !name.includes('alpha') &&
        !name.includes('beta') &&
        !name.includes('rc')
      );
    });
    if (stableTag) {
      //   console.log(`最新的正式标签是: ${stableTag.name}`);
      return stableTag.name.slice(1);
    } else {
      console.log('未找到任何正式标签。');
    }
  } catch (error) {
    console.error(`获取标签时出错: ${error}`);
  }
}

async function downloadFile(url, outputPath) {
  console.log('开始下载', url);
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP 错误! 状态码: ${response.status}`);
    }

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

const tag = await getLatestTag();
if (!tag) {
  process.exit(1);
}

if (tag === oldLibVersion) {
  console.info(`当前 twcss 生产环境文件已是最新版本 ${oldLibVersion}`);
} else {
  console.info(
    `当前 twcss 生产环境文件不是最新版本${oldLibVersion}，准备开始下载最新版本：${tag}`,
  );

  // 远程 tailwindcss 生产环境文件 URL
  const url = `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@${tag}`;

  await downloadFile(url, outputPath);
}
