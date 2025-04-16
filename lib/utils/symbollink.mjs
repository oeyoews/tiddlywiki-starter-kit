import fs from 'fs-extra';

/**
 * 创建subwiki
 * @param {*} targetPath
 * @param {*} symlinkPath
 * @returns
 */
export default async function createSymlink(targetPath, symlinkPath) {
  try {
    // 确保目标文件夹存在
    if (!(await fs.pathExists(targetPath))) {
      await fs.mkdirp(targetPath);
    }

    // 检查软链接是否已存在
    if (await fs.pathExists(symlinkPath)) {
      console.info(`softlink ${symlinkPath} has exist, skip`);
      return;
    }

    // 创建软链接
    await fs.ensureSymlink(targetPath, symlinkPath, 'junction');
    console.info(
      `successfully create subwiki softlink: ${symlinkPath} -> ${targetPath}`,
    );
  } catch (error) {
    console.error(`failed to create softlink:`, error);
    throw error;
  }
}
