import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export default async function checkFileSize(folderPath) {
  let count = 0;

  try {
    const files = await readdir(folderPath);

    for (const file of files) {
      const filePath = join(folderPath, file);
      const fileStats = await stat(filePath);

      if (fileStats.isDirectory()) {
        // 如果是文件夹，递归调用 checkFileSize，并传递当前文件夹路径
        count += await checkFileSize(filePath);
      } else {
        const fileSizeInBytes = fileStats.size;
        const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

        if (fileSizeInMegabytes > 5) {
          console.log(
            `${filePath} 的大小超过 5M: ${fileSizeInMegabytes.toFixed(2)} MB`
          );
          count++;
        }
      }
    }
  } catch (err) {
    console.error('发生错误:', err);
  }

  return count;
}
