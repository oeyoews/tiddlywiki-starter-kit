// push git repo, if have conflict, use merge

const { exec } = require('child_process');

// 拉取远程仓库最新代码
exec('git pull origin', (err, stdout, stderr) => {
  if (err) {
    console.error('拉取远程仓库最新代码失败：', err);
    return;
  }
  console.log('拉取远程仓库最新代码成功!');

  // 添加变更文件
  exec('git add .', (err, stdout, stderr) => {
    if (err) {
      console.error('添加变更文件失败：', err);
      return;
    }
    console.log('添加变更文件成功!');

    // 提交变更文件
    exec('git commit -m "提交变更文件"', (err, stdout, stderr) => {
      if (err) {
        console.error('提交变更文件失败：', err);
        return;
      }
      console.log('提交变更文件成功!');

      // 推送变更文件
      exec('git push', (err, stdout, stderr) => {
        if (err) {
          console.error('推送变更文件失败：', err);
          // 如果推送失败，则尝试合并冲突
          exec('git merge --no-ff --no-edit', (err, stdout, stderr) => {
            if (err) {
              console.error('合并冲突失败：', err);
              return;
            }
            console.log('合并冲突成功!');
          });
          return;
        }
        console.log('推送变更文件成功!');
      });
    });
  });
});
