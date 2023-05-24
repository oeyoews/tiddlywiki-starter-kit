const simpleGit = require('simple-git');

// 初始化 simple-git
const git = simpleGit();

/**
 * async merge
 *
 */

// 定义一个异步函数来提交所有修改过的文件
async function commitChanges() {
  try {
    // 获取修改过的文件列表
    const status = await git.status();
    const modifiedFiles = status.modified;
    const addedFiles = status.not_added;
    const allFiles = [...modifiedFiles, ...addedFiles];

    // 如果没有修改或新增的文件
    if (allFiles.length === 0) {
      console.log('No changes to commit.');
      return;
    }

    // 添加所有文件到暂存区
    await git.add('.');

    console.log('Files added to staging area.');

    // 依次提交所有文件
    for (const file of allFiles) {
      console.log(`Committing changes for file ${file}...`);
      await git.commit(`Updated ${file}`);
      console.log(`Changes for file ${file} committed!`);
    }

    // 推送到远程仓库
    await git.push('origin', 'main');

    console.log('Changes pushed to remote repository.');
  } catch (err) {
    // 如果 push 操作产生冲突
    if (err.message.includes('failed to push some refs to')) {
      console.error(
        'Push operation failed due to conflicts. Merging changes...',
      );

      try {
        // 合并远程仓库和本地仓库的修改
        await git.pull('origin', 'main');

        console.log('Changes merged successfully.');

        // 再次推送到远程仓库
        await git.push('origin', 'main');

        console.log('Changes pushed to remote repository.');
      } catch (err) {
        console.error('Failed to merge and push changes:', err);
      }
    } else {
      console.error('Failed to commit and push changes:', err);
    }
  }
}

// 调用异步函数来提交所有修改过的文件
commitChanges();

/**
 * async not merge
 *
 */
// 定义一个异步函数来提交所有修改过的文件
async function commitChanges() {
  try {
    // 获取修改过的文件列表
    const status = await git.status();
    const modifiedFiles = status.modified;
    const addedFiles = status.not_added;
    const allFiles = [...modifiedFiles, ...addedFiles];

    // 如果没有修改或新增的文件
    if (allFiles.length === 0) {
      console.log('No changes to commit.');
      return;
    }

    // 添加所有文件到暂存区
    await git.add('.');

    console.log('Files added to staging area.');

    // 依次提交所有文件
    for (const file of allFiles) {
      console.log(`Committing changes for file ${file}...`);
      await git.commit(`Updated ${file}`);
      console.log(`Changes for file ${file} committed!`);
    }

    // 推送到远程仓库
    await git.push('origin', 'main');

    console.log('Changes pushed to remote repository.');
  } catch (err) {
    console.error('Failed to commit and push changes:', err);
  }
}

// 调用异步函数来提交所有修改过的文件
commitChanges(); * /

/**
 * promise
 *
 */

// 获取修改过的文件列表
git
  .status()
  .then(status => {
    const modifiedFiles = status.modified;
    const addedFiles = status.not_added;
    const allFiles = [...modifiedFiles, ...addedFiles];

    // 如果没有修改或新增的文件
    if (allFiles.length === 0) {
      console.log('No changes to commit.');
      return;
    }

    // 添加所有文件到暂存区
    return git
      .add('.')
      .then(() => console.log('Files added to staging area.'))
      .then(() => {
        // 依次提交所有文件
        return allFiles.reduce((promise, file) => {
          return promise.then(() => {
            console.log(`Committing changes for file ${file}...`);
            return git
              .commit(`Updated ${file}`)
              .then(() => console.log(`Changes for file ${file} committed!`))
              .catch(err =>
                console.error(
                  `Failed to commit changes for file ${file}:`,
                  err,
                ),
              );
          });
        }, Promise.resolve());
      })
      .then(() => {
        // 推送到远程仓库
        return git
          .push('origin', 'main')
          .then(() => console.log('Changes pushed to remote repository.'))
          .catch(err => console.error('Failed to push changes:', err));
      })
      .catch(err => console.error('Failed to commit and push changes:', err));
  })
  .catch(err => console.error('Failed to get status:', err)); * /
