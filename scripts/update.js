const simpleGit = require('simple-git');

// 初始化 simple-git
const git = simpleGit();

// 检查文件状态
git.status((err, status) => {
  if (err) {
    console.log(err);
  } else {
    // 如果有修改或新增的文件
    if (status.modified.length || status.not_added.length) {
      // 添加所有文件到暂存区
      git
        .add('.')
        .then(() => {
          // 提交所有文件
          git
            .commit('Commit message')
            .then(() => console.log('Changes committed!'))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    } else {
      console.log('No changes to commit.');
    }
  }
});

// 推送到远程仓库
git
  .push('origin', 'main')
  .then(() => console.log('Changes pushed to remote repository.'))
  .catch(err => console.error('Failed to push changes:', err));
