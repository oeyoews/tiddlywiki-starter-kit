import fs from 'fs-extra';
import path from 'path';

const __dirname = import.meta.dirname;

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
      const stat = await fs.lstat(symlinkPath);
      if (stat.isSymbolicLink()) {
        const linkTarget = await fs.readlink(symlinkPath);
        const expectedTarget = path.relative(
          path.dirname(symlinkPath),
          targetPath,
        );
        // 判断是否为有效的相对路径软连接
        if (linkTarget === path.resolve(__dirname, expectedTarget)) {
          console.info(`softlink ${symlinkPath} has exist and is valid, skip`);
          return;
        } else {
          // 删除无效软连接
          await fs.remove(symlinkPath);
          console.info(`softlink ${symlinkPath} is invalid, recreating`);
        }
      } else {
        // 已存在但不是软连接，直接删除
        await fs.remove(symlinkPath);
        console.info(`${symlinkPath} exists but is not a symlink, recreating`);
      }
    }

    // 计算相对路径
    const relativeTarget = path.relative(path.dirname(symlinkPath), targetPath);

    // 创建软链接（使用相对路径）
    await fs.ensureSymlink(relativeTarget, symlinkPath, 'junction');
    console.info(
      `successfully create subwiki softlink: ${symlinkPath} -> ${relativeTarget}`,
    );
  } catch (error) {
    console.error(`failed to create softlink:`, error);
    throw error;
  }
}
