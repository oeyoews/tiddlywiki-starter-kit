import fs from 'fs-extra';
import path from 'path';

/**
 * 创建文件夹软连接
 * @param {string} targetPath 目标文件夹路径
 * @param {string} symlinkPath 软连接路径
 * @returns {Promise<void>}
 */
export default async function createSymlink(targetPath, symlinkPath) {
  try {
    // 确保目标文件夹存在
    if (!(await fs.pathExists(targetPath))) {
      await fs.mkdirp(targetPath);
      console.info(`Target directory ${targetPath} created`);
    }

    // 检查软链接是否已存在
    if (await fs.pathExists(symlinkPath)) {
      const stat = await fs.lstat(symlinkPath);
      if (stat.isSymbolicLink()) {
        const linkTarget = await fs.readlink(symlinkPath);

        // 获取绝对路径进行比较
        const absoluteLinkTarget = path.resolve(
          path.dirname(symlinkPath),
          linkTarget,
        );
        const absoluteExpectedTarget = path.resolve(targetPath);

        // 判断是否为有效的软连接（比较绝对路径）
        if (absoluteLinkTarget === absoluteExpectedTarget) {
          console.info(
            `Directory softlink ${symlinkPath} already exists and is valid, skipping`,
          );
          return;
        } else {
          // 删除无效软连接
          await fs.remove(symlinkPath);
          console.info(
            `Directory softlink ${symlinkPath} is invalid, recreating`,
          );
        }
      } else {
        // 已存在但不是软连接，直接删除
        await fs.remove(symlinkPath);
        console.info(
          `${symlinkPath} already exists but is not a symlink, recreating`,
        );
      }
    }

    // 计算相对路径
    const relativeTarget = path.relative(path.dirname(symlinkPath), targetPath);

    // 创建文件夹软链接（使用相对路径和junction类型）
    await fs.ensureSymlink(relativeTarget, symlinkPath, 'junction');
    console.info(
      `Successfully created directory softlink: ${symlinkPath} -> ${relativeTarget}`,
    );
  } catch (error) {
    console.error(`Failed to create directory softlink:`, error);
    throw error;
  }
}
