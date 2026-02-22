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

// 生产环境文件在包内的路径（见 @tailwindcss/browser package.json main）
const BROWSER_FILE_PATH = '/dist/index.global.js';

// 多个 CDN 作为备选（jsDelivr 在某些网络下可能失败）
const CDN_BASE_URLS = [
  'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@',
  'https://unpkg.com/@tailwindcss/browser@',
];

async function downloadFile(url, outputPath) {
  console.log('开始下载', url);
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'Node-updateTwLib/1.0' },
    });

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
    const cause = error.cause ? ` (原因: ${error.cause.message || error.cause})` : '';
    console.error(`文件下载失败: ${error.message}${cause}`);
    throw error;
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

  let lastError;
  for (const baseUrl of CDN_BASE_URLS) {
    const url = `${baseUrl}${tag}${BROWSER_FILE_PATH}`;
    try {
      await downloadFile(url, outputPath);
      lastError = null;
      break;
    } catch (err) {
      lastError = err;
      console.warn(`当前 CDN 失败，尝试下一个: ${url}`);
    }
  }
  if (lastError) {
    console.error('所有 CDN 均下载失败，请检查网络或代理设置。');
    process.exit(1);
  }
}
