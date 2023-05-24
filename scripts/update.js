const { spawn } = require('child_process');

// 1. 拉取远程仓库最新代码
const pull = spawn('git', ['pull']);

pull.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

pull.stderr.on('data', data => {
  console.error(`stderr: ${data}`);
});

pull.on('close', code => {
  console.log(`child process exited with code ${code}`);

  // 2. 添加变更文件
  const add = spawn('git', ['add', '.']);

  add.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });

  add.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });

  add.on('close', code => {
    console.log(`child process exited with code ${code}`);

    // 3. 提交变更文件
    const commit = spawn('git', ['commit', '-m', 'Updated With AI']);

    commit.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
    });

    commit.stderr.on('data', data => {
      console.error(`stderr: ${data}`);
    });

    commit.on('close', code => {
      console.log(`child process exited with code ${code}`);

      // 4. 推送变更文件
      const push = spawn('git', ['push']);

      push.stdout.on('data', data => {
        console.log(`stdout: ${data}`);
      });

      push.stderr.on('data', data => {
        console.error(`stderr: ${data}`);
      });

      push.on('close', code => {
        console.log(`child process exited with code ${code}`);

        if (code !== 0) {
          // 5. 如果推送失败，则使用merge方法来合并冲突
          const merge = spawn('git', ['merge']);

          merge.stdout.on('data', data => {
            console.log(`stdout: ${data}`);
          });

          merge.stderr.on('data', data => {
            console.error(`stderr: ${data}`);
          });

          merge.on('close', code => {
            console.log(`child process exited with code ${code}`);

            if (code !== 0) {
              console.error('Failed to merge changes');
            } else {
              console.log('Changes merged successfully');
            }
          });
        } else {
          console.log('Changes pushed successfully');
        }
      });
    });
  });
});
